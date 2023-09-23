import nock from 'nock'
import Deluge from '../index.js'

nock.load('./src/__tests__/responses/addTorrent.json')

const deluge = new Deluge('http://host.com', 'passwd', 8083)

it('Add a torrent to deluge', () =>
  deluge.addTorrent(Buffer.from('file')).then((result) => {
    expect(result).toBeDefined()
    expect(result).toMatchSnapshot()
  }))
