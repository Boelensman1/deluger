import * as superagent from 'superagent';

import addTorrent from './addTorrent';
import getConfig from './getConfig';
import getStatus from './getStatus';
import listTorrents from './listTorrents';

export default class Deluge {
  /* tslint:disable */
  public getConfig: Function;
  public getStatus: Function;
  public listTorrents: Function;
  public addTorrent: Function;
  /* tslint:enable */

  private baseUrl: string;
  private agent: any;
  private counter = 0;

  constructor(
    private hostname: string,
    private password: string,
    private port = 8112) {
    this.baseUrl = `${this.hostname}:${port}/json`;

    // init cookie support
    this.agent = superagent.agent();

    // add functions
    this.getConfig = getConfig;
    this.getStatus = getStatus;
    this.listTorrents = listTorrents;
    this.addTorrent = addTorrent;
  }

  authenticate(): Promise<boolean> {
    return this.fetch('auth.login', [this.password], false).then(res => {
      return res === true;
    });
  }

  fetch(method: string, params: Array<string> = [], autoLogin= true): Promise<any> {
    const body = {
      method,
      params,
      id: this.counter++,
    };

    return this.agent.post(this.baseUrl).send(body).buffer()
    .then(res => {
      if (!res.ok) {
        throw res.error;
      }
      return JSON.parse(res.text);
    })
    .then(res => {
      if (res.error !== null) {
        // check if error was due to not being authenticated and if so, login
        if (res.error.code === 1 && autoLogin) {
          return this.authenticate().then(() => (this.fetch(method, params, false)));
        }
        throw new Error(res.statusText);
      }
      return res.result;
    });
  }
}
