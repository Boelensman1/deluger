import { Torrent, TorrentHash, TorrentWithProps } from './index.mjs'

export type Torrents = Record<TorrentHash, Torrent>

export type TorrentsWithProps<T extends (keyof Torrent)[]> = Record<
  TorrentHash,
  TorrentWithProps<T>[]
>
