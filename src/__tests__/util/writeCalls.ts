import * as fs from 'fs'
import * as path from 'path'
import * as zlib from 'zlib'

/**
 * Write nock calls to a .json file
 *
 * @param {array} calls The calls that have been made (from nock.recorder)
 * @returns {undefined}
 */
function writeCalls(calls: any) {
  calls.forEach((call: any) => {
    const response = new Buffer(call.response.join(''), 'hex')

    const contents = zlib.gunzipSync(response).toString('utf8')

    call.response = JSON.parse(contents)
    call.rawHeaders.splice(call.rawHeaders.indexOf('Content-Encoding'), 1)
    call.rawHeaders.splice(call.rawHeaders.indexOf('gzip'), 1)
  })

  const argv = process.argv.slice(2)
  const filename = `${path.resolve(argv[0]).replace(/\.[^/.]+$/, '')}.json`
  fs.writeFileSync(filename, JSON.stringify(calls, null, 2), {
    encoding: 'utf8',
  })
}

export default writeCalls
