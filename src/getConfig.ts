export interface IConfigResult {
  result: any[];
}

export default function getConfig(): Promise<IConfigResult> {
  return this.fetch('core.get_config');
}
