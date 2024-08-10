import { expect, test } from 'vitest'

import getDelugeInstance from './util/getDelugeInstance.js'

const deluge = getDelugeInstance()

test('Gets the current config of the deluge client', async () => {
  const config = await deluge.getConfig()
  expect(config).toBeDefined()
  expect(config).toHaveProperty('max_download_speed')
  expect(config).toHaveProperty('max_upload_speed')
})
