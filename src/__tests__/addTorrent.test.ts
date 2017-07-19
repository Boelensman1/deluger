import * as fs from 'fs';
import * as nock from 'nock';
import Deluge from '..'; // tslint:disable-line import-name

nock.load('./src/__tests__/responses/addTorrent.json');

const readFile = file => (
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  })
);

const deluge = new Deluge('http://host.com', 'passwd', 8083);

it('Add a torrent to deluge', () => (
  deluge.addTorrent('file').then((result) => {
    expect(result).toBeDefined();
    expect(result).toMatchSnapshot();
  })),
);
