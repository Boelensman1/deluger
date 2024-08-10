import Deluge from '../../src/main.mjs'

const getDelugeInstance = () => {
  return new Deluge('http://localhost', 'deluge', 8112)
}

export default getDelugeInstance
