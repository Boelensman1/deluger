import { expect, test } from 'vitest'

import getDelugeInstance from './util/getDelugeInstance.js'

const deluge = getDelugeInstance()

test('Gets the current status of the deluge client', async () => {
  const status = await deluge.getStatus([
    'max_download_speed',
    'max_upload_speed',
  ])
  expect(status).toBeDefined()
  expect(status).toHaveProperty('stats')
  expect(status.stats).toHaveProperty('max_download')
  expect(status.stats).toHaveProperty('max_upload')
})
