import * as nock from 'nock';
import Deluge from '..'; // tslint:disable-line import-name

nock.load('./src/__tests__/responses/getStatus.json');

const deluge = new Deluge('http://host.com', 'passwd', 8083);

it('Gets the current status of the deluge client', () => (
  deluge.getStatus(['progress']).then((statusres) => {
    expect(statusres).toBeDefined();
    expect(statusres).toMatchSnapshot();
  })),
);
