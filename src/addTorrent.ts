import defaultProperties from './defaultProperties';

export default function addTorrent(
  torrent: Buffer,
  location?: string,
): Promise<string> {
  const params = [
    Buffer.from(torrent).toString('base64'),
    {
      download_location: location, // eslint-disable-line
    },
  ];

  return this.fetch('webapi.add_torrent', params).then((result) => {
    if (result === null || result.length !== 40) {
      // tslint:disable-next-line max-line-length
      throw new Error('Deluge answered with null when an id was expected, maybe the torrent is already added?');
    }
    return result;
  });
}
