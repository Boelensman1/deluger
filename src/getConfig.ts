export interface ConfigResult {
  result: Array<any>;
}

export default function getConfig(): Promise<ConfigResult> {
  return this.fetch('core.get_config');
}
