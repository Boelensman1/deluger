import defaultProperties from './defaultProperties';
import { IFilters, IStats, ITorrents } from './interfaces';

export interface IStatusResult {
  stats: IStats;
  connected: boolean;
  torrents: ITorrents;
  filters: IFilters;
}

export default function getStatus(
  properties = defaultProperties,
): Promise<IStatusResult> {
  const params = [
    properties,
    [],
  ];
  return this.fetch('web.update_ui', params);
}
