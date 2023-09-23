import { Torrent } from './index.js'

export interface Torrents {
  [hash: string]: Torrent
}
