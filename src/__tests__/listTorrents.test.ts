import * as nock from 'nock';
import Deluge from '..';

nock.load('./src/__tests__/responses/listTorrents.json');

const deluge = new Deluge('http://host.com', 'passwd', 8083);

it('List the torrents of the deluge client', () => (
  deluge.listTorrents(['progress'], ['652e86b14aa91023ec1fb75a488ac6f34cd39ff0']).then(torrents => {
    expect(torrents).toBeDefined();
    expect(torrents).toMatchSnapshot();
  })
));
