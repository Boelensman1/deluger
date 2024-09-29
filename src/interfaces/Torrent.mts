import type { TorrentHash } from './index.mjs'

export interface Torrent {
  max_download_speed: number
  upload_payload_rate: number
  download_payload_rate: number
  num_peers: number
  ratio: number
  total_peers: number
  total_size: number
  state: string
  max_upload_speed: number
  eta: number
  save_path: string
  progress: number
  time_added: number
  tracker_host: string
  total_uploaded: number
  total_done: number
  hash: TorrentHash
  total_seeds: number
  seeds_peers_ratio: number
  num_seeds: number
  name: string
  is_auto_managed: boolean
  queue: number
  distributed_copies: number
  file_priorities: number[]
  add_paused: boolean
  compact_allocation: boolean
  download_location: string
  max_connections: number
  max_upload_slots: number
  prioritize_first_last_pieces: boolean
  move_completed: boolean
  move_completed_path?: string
  pre_allocate_storage: boolean
  sequential_download: boolean
  seed_mode: boolean
  super_seeding: boolean
}

export type TorrentWithProps<T extends (keyof Torrent)[]> = Pick<
  Torrent,
  T[number]
>
