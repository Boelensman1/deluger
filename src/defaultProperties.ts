import type { Torrent } from './interfaces/Torrent.js'

const defaultProperties: (keyof Torrent)[] = [
  'hash',
  'queue',
  'name',
  'total_size',
  'state',
  'progress',
  'num_seeds',
  'total_seeds',
  'num_peers',
  'total_peers',
  'download_payload_rate',
  'upload_payload_rate',
  'eta',
  'ratio',
  'distributed_copies',
  'is_auto_managed',
  'time_added',
  'tracker_host',
  'save_path',
  'total_done',
  'total_uploaded',
  'max_download_speed',
  'max_upload_speed',
  'seeds_peers_ratio',
]

export default defaultProperties
