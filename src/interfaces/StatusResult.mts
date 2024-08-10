import type { Filters, Stats, Torrent, TorrentsWithProps } from './index.mjs'

export interface StatusResult<T extends (keyof Torrent)[]> {
  stats: Stats
  connected: boolean
  torrents: TorrentsWithProps<T>
  filters: Filters
}
