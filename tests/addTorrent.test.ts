import fs from 'node:fs'
import { expect, test, afterAll } from 'vitest'

import getDelugeInstance from './util/getDelugeInstance.js'
import { TorrentHash } from '../src/interfaces/TorrentHash.mjs'

const deluge = getDelugeInstance()

const file = fs.readFileSync('./tests/torrents/1.torrent')

const addedTorrentHash =
  '2cfe241d92f2cfdf4a487ce0488fb78958caefb3' as TorrentHash

test('Add a torrent to deluge', async () => {
  const result = await deluge.addTorrent(file)

  expect(result).toBeDefined()
  expect(result.length).toBe(40)
})

afterAll(async () => {
  await deluge.removeTorrent(addedTorrentHash, true)
})
