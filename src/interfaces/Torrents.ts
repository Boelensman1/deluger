import { ITorrent } from './index.js'

export interface ITorrents {
  [hash: string]: ITorrent
}
