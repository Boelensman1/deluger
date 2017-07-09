export interface Torrent {
  hash: string;
  queue: number;
  name: number;
  total_size: number;
  state: string;
  progress: number;
  num_seeds: number;
  total_seeds: number;
  num_peers: number;
  total_peers: number;
  download_payload_rate: number;
  upload_payload_rate: number;
  eta: number;
  ratio: number;
  distributed_copies: number;
  is_auto_managed: number;
  time_added: string;
  tracker_host: string;
  save_path: string;
  total_done: number;
  total_uploaded: number;
  max_download_speed: number;
  max_upload_speed: number;
  seeds_peers_ratio: number;
}
