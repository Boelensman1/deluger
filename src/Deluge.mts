import got, { Got } from 'got'
import { CookieJar } from 'tough-cookie'

import type {
  ConfigResult,
  StatusResult,
  Torrent,
  TorrentHash,
  Torrents,
  TorrentsWithProps,
} from './interfaces/index.mjs'
import torrentProps from './torrentProps.mjs'

interface DelugeError {
  code: number
  message: string
}

interface DelugeResult<T> {
  error: null | DelugeError
  id: number
  result: T
}

export class Deluge {
  private counter = -1
  private client: Got

  constructor(
    hostname: string,
    private password: string,
    port = 8112,
  ) {
    // create client
    this.client = got.extend({
      prefixUrl: `${hostname}:${port}`,
      retry: { limit: 2 },
      cookieJar: new CookieJar(), // add cookie support
    })
  }

  public async authenticate(): Promise<boolean> {
    const res = await this.fetch('auth.login', [this.password], false)
    return res === true
  }

  private async fetch<T>(
    method: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: any[] = [],
    autoLogin = true,
  ): Promise<T> {
    const body = {
      method,
      params,
      id: (this.counter += 1),
    }

    const result = await this.client
      .post('json', {
        json: body,
      })
      .json<DelugeResult<T>>()

    if (result.error !== null) {
      // check if error was due to not being authenticated and if so, login
      if (result.error.code === 1 && autoLogin) {
        return this.authenticate().then(() => this.fetch(method, params, false))
      }
      throw new Error(`Deluge api gave error: ${result.error.message}`)
    }
    return result.result
  }

  /**
   * Add a torrent to deluge, uses https://github.com/idlesign/deluge-webapi
   *
   * @returns {string} The hash of the torrent
   */
  public async addTorrent(
    torrent: Buffer,
    location?: string,
  ): Promise<TorrentHash> {
    const params = [
      'filename.torrent', // not sure what this is used for
      Buffer.from(torrent).toString('base64'),
      {
        download_location: location,
      },
    ]

    const result = await this.fetch<TorrentHash>(
      'core.add_torrent_file',
      params,
    )

    if (result === null || result.length !== 40) {
      throw new Error('Deluge API did not return an id')
    }
    return result
  }

  public getConfig(): Promise<ConfigResult> {
    return this.fetch<ConfigResult>('core.get_config')
  }

  public getStatus<T extends (keyof Torrent)[]>(
    properties: T = torrentProps as T,
  ): Promise<StatusResult<T>> {
    const params = [properties, []]
    return this.fetch<StatusResult<T>>('web.update_ui', params)
  }

  public async listTorrents(torrentHashes?: TorrentHash[]): Promise<Torrents>
  public async listTorrents<T extends (keyof Torrent)[] = typeof torrentProps>(
    torrentHashes: TorrentHash[],
    properties: T,
  ): Promise<TorrentsWithProps<T>>
  public async listTorrents<T extends (keyof Torrent)[] = typeof torrentProps>(
    torrentHashes: TorrentHash[] = [],
    properties: T = torrentProps as T,
  ): Promise<Torrents | TorrentsWithProps<T>> {
    const params = [{}, properties]

    if (torrentHashes.length > 0) {
      params[0] = { id: torrentHashes }
    }

    return this.fetch('core.get_torrents_status', params)
  }

  public async removeTorrent(
    torrentHash: TorrentHash,
    removeData = false,
  ): Promise<boolean> {
    const params = [torrentHash, removeData]
    return this.fetch<boolean>('core.remove_torrent', params)
  }
}
