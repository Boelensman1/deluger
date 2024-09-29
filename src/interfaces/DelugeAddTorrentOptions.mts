export type DelugeAddTorrentOptions = Partial<{
  file_priorities: number[]
  add_paused: boolean
  compact_allocation: boolean
  download_location: string
  max_connections: number
  max_download_speed: number
  max_upload_slots: number
  max_upload_speed: number
  prioritize_first_last_pieces: boolean
  move_completed: boolean
  move_completed_path?: string
  pre_allocate_storage: boolean
  sequential_download: boolean
  seed_mode: boolean
  super_seeding: boolean
}>
