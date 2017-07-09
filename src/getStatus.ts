import defaultProperties from './defaultProperties';
import { Filters, Stats, Torrents } from './interfaces';

export interface StatusResult {
  stats: Stats;
  connected: boolean;
  torrents: Torrents;
  filters: Filters;
}

export default function getStatus(properties = defaultProperties): Promise<StatusResult> {
  const params = [
    properties,
    [],
  ];
  return this.fetch('web.update_ui', params);
}
