import fs from 'node:fs'
import { expect, test, beforeAll, afterAll } from 'vitest'

import getDelugeInstance from './util/getDelugeInstance.js'
import { TorrentHash } from '../src/interfaces/TorrentHash.mjs'

const deluge = getDelugeInstance()

const addedTorrentHash =
  '1cd53f2aea6cf32037b8c4d3a339c72cdf3c2165' as TorrentHash

beforeAll(async () => {
  const file = fs.readFileSync('./tests/torrents/2.torrent')
  await deluge.addTorrent(file)
})

test('List the torrents of the deluge client', async () => {
  if (!addedTorrentHash) {
    throw new Error('Torrent was not added successfully in beforeAll')
  }

  const torrents = await deluge.listTorrents(
    [addedTorrentHash],
    ['name', 'progress'],
  )

  expect(torrents).toBeDefined()
  expect(Object.keys(torrents)).toHaveLength(1)
  expect(torrents[addedTorrentHash]).toBeDefined()
  expect(torrents[addedTorrentHash]).toHaveProperty('name')
  expect(torrents[addedTorrentHash]).toHaveProperty('progress')
})

afterAll(async () => {
  await deluge.removeTorrent(addedTorrentHash, true)
})
