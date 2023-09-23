import nock from 'nock'
import Deluge from '../index.js'

nock.load('./src/__tests__/responses/getConfig.json')

const deluge = new Deluge('http://host.com', 'passwd', 8083)

it('Gets the current status of the deluge client', () =>
  deluge.getConfig().then((config) => {
    expect(config).toBeDefined()
    expect(config).toMatchSnapshot()
  }))
