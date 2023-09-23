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
  hash: string
  total_seeds: number
  seeds_peers_ratio: number
  num_seeds: number
  name: string
  is_auto_managed: boolean
  queue: number
  distributed_copies: number
}
