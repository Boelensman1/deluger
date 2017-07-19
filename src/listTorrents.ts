import defaultProperties from './defaultProperties';
import { ITorrents } from './interfaces';

export default function listTorrents(
  properties = defaultProperties,
  torrentHashes = [],
): Promise<ITorrents> {
  const params = [
    torrentHashes,
    properties,
  ];

  const getHashProperty = properties.indexOf('hash') > -1;
  if (!getHashProperty) {
    params[1].push('hash'); // we always need the hash
  }

  return this.fetch('webapi.get_torrents', params).then(result => (
    result.torrents.map((torrent) => {
      const torrentFormatted = {};
      torrentFormatted[torrent.hash] = torrent;
      if (!getHashProperty) {
        delete torrentFormatted[torrent.hash].hash;
      }
      return torrentFormatted;
    })
  ));
}
