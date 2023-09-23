import * as superagent from 'superagent'

import defaultProperties from './defaultProperties.js'
import { IFilters, IStats, ITorrents } from './interfaces/index.js'

export interface IConfigResult {
  result: any[]
}

export interface IStatusResult {
  stats: IStats
  connected: boolean
  torrents: ITorrents
  filters: IFilters
}

export default class Deluge {
  private baseUrl: string
  private agent: any
  private counter = -1

  constructor(
    hostname: string,
    private password: string,
    port = 8112,
  ) {
    this.baseUrl = `${hostname}:${port}/json`

    // init cookie support
    this.agent = superagent.agent()
  }

  public async authenticate(): Promise<boolean> {
    const res = await this.fetch('auth.login', [this.password], false)
    return res === true
  }

  private async fetch(
    method: string,
    params: string[] = [],
    autoLogin = true,
  ): Promise<any> {
    const body = {
      method,
      params,
      id: (this.counter += 1),
    }

    const result: any = await this.agent
      .post(this.baseUrl)
      .send(body)
      .buffer()
      .then((res: any) => {
        if (!res.ok) {
          throw res.error
        }
        return JSON.parse(res.text)
      })

    if (result.error !== null) {
      // check if error was due to not being authenticated and if so, login
      if (result.error.code === 1 && autoLogin) {
        return this.authenticate().then(() => this.fetch(method, params, false))
      }
      throw new Error(result.statusText)
    }
    return result.result
  }

  /**
   * Add a torrent to deluge, uses https://github.com/idlesign/deluge-webapi
   *
   * @returns {string} The hash of the torrent
   */
  public async addTorrent(torrent: Buffer, location?: string): Promise<string> {
    const params = [
      Buffer.from(torrent).toString('base64'),
      JSON.stringify({
        download_location: location,
      }),
    ]

    const result = await this.fetch('webapi.add_torrent', params)

    if (result === null || result.length !== 40) {
      // tslint:disable-next-line max-line-length
      throw new Error(
        'Deluge answered with null when an id was expected, maybe the torrent is already added?',
      )
    }
    return result
  }

  public getConfig(): Promise<IConfigResult> {
    return this.fetch('core.get_config')
  }

  public getStatus(properties = defaultProperties): Promise<IStatusResult> {
    const params = [properties, []].map((i) => JSON.stringify(i))
    return this.fetch('web.update_ui', params)
  }

  public async listTorrents(
    properties = defaultProperties,
    torrentHashes: string[] = [],
  ): Promise<ITorrents> {
    const params = [torrentHashes, properties]

    const getHashProperty = properties.indexOf('hash') > -1
    if (!getHashProperty) {
      params[1].push('hash') // we always need the hash
    }

    const result = await this.fetch(
      'webapi.get_torrents',
      params.map((i) => JSON.stringify(i)),
    )
    return result.torrents.map((torrent: any) => {
      const torrentFormatted = {}
      // @ts-expect-error
      torrentFormatted[torrent.hash] = torrent
      if (!getHashProperty) {
        // @ts-expect-error
        delete torrentFormatted[torrent.hash].hash
      }
      return torrentFormatted
    })
  }
}
