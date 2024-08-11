export interface ConfigResult {
  send_info: boolean
  info_sent: number
  daemon_port: number
  allow_remote: boolean
  pre_allocate_storage: boolean
  download_location: string
  listen_ports: number[]
  listen_interface: string
  outgoing_interface: string
  random_port: boolean
  listen_random_port: number
  listen_use_sys_port: boolean
  listen_reuse_port: boolean
  outgoing_ports: number[]
  random_outgoing_ports: boolean
  copy_torrent_file: boolean
  del_copy_torrent_file: boolean
  torrentfiles_location: string
  plugins_location: string
  prioritize_first_last_pieces: boolean
  sequential_download: boolean
  dht: boolean
  upnp: boolean
  natpmp: boolean
  utpex: boolean
  lsd: boolean
  enc_in_policy: number
  enc_out_policy: number
  enc_level: number
  max_connections_global: number
  max_upload_speed: number
  max_download_speed: number
  max_upload_slots_global: number
  max_half_open_connections: number
  max_connections_per_second: number
  ignore_limits_on_local_network: boolean
  max_connections_per_torrent: number
  max_upload_slots_per_torrent: number
  max_upload_speed_per_torrent: number
  max_download_speed_per_torrent: number
  enabled_plugins: string[]
  add_paused: boolean
  max_active_seeding: number
  max_active_downloading: number
  max_active_limit: number
  dont_count_slow_torrents: boolean
  queue_new_to_top: boolean
  stop_seed_at_ratio: boolean
  remove_seed_at_ratio: boolean
  stop_seed_ratio: number
  share_ratio_limit: number
  seed_time_ratio_limit: number
  seed_time_limit: number
  auto_managed: boolean
  move_completed: boolean
  move_completed_path: string
  move_completed_paths_list: string[]
  download_location_paths_list: string[]
  path_chooser_show_chooser_button_on_localhost: boolean
  path_chooser_auto_complete_enabled: boolean
  path_chooser_accelerator_string: string
  path_chooser_max_popup_rows: number
  path_chooser_show_hidden_files: boolean
  new_release_check: boolean
  proxy: {
    anonymous_mode: boolean
    force_proxy: boolean
    hostname: string
    password: string
    port: number
    proxy_hostnames: boolean
    proxy_peer_connections: boolean
    proxy_tracker_connections: boolean
    type: number
    username: string
  }
  peer_tos: string
  rate_limit_ip_overhead: boolean
  geoip_db_location: string
  cache_size: number
  cache_expiry: number
  auto_manage_prefer_seeds: boolean
  shared: boolean
  super_seeding: boolean
}