# Deluger
Deluger is a simple Node.js wrapper around the Deluge API, providing a convenient interface to interact with Deluge torrent client (version 2.1 and above).

## Compatibility

**Important**: This package is only compatible with Deluge version 2.1 and above.

## Installation

You can install Deluger using npm:

```bash
npm install deluger
```

## Usage

Here's a basic example of how to use Deluger:

```javascript
import Deluge from 'deluger';

const deluge = new Deluge('http://localhost', 'password', 8112);

// Get current status
const status = await deluge.getStatus(['progress']);
console.log(status);

// List torrents
const torrents = await deluge.listTorrents();
console.log(torrents);
```

## API

### Constructor

#### `new Deluge(hostname: string, password: string, port: number = 8112)`

Creates a new Deluge instance.

### Methods

#### `authenticate()`

Authenticates with the Deluge server, is also called authomatically when another method is called while not being authenticated.

- **Returns**: `Promise<boolean>`

#### `addTorrent(torrent: Buffer, location?: string)`

Adds a torrent to Deluge.

- **Parameters**:
  - `torrent`: `Buffer` - The torrent file as a buffer
  - `location`: `string` (optional) - The download location
- **Returns**: `Promise<TorrentHash>`

#### `getConfig()`

Gets the current configuration of the Deluge client.

- **Returns**: `Promise<ConfigResult>`

#### `getStatus(properties?: (keyof Torrent)[])`

Gets the current status of the Deluge client.

- **Parameters**:
  - `properties`: `(keyof Torrent)[]` (optional) - List of properties to retrieve
- **Returns**: `Promise<StatusResult>`

#### `listTorrents(torrentHashes?: TorrentHash[], properties?: (keyof Torrent)[])`

Lists torrents in the Deluge client.

- **Parameters**:
  - `torrentHashes`: `TorrentHash[]` (optional) - List of torrent hashes to filter
  - `properties`: `(keyof Torrent)[]` (optional) - List of properties to retrieve
- **Returns**: `Promise<Torrents | TorrentsWithProps>`

#### `removeTorrent(torrentHash: TorrentHash, removeData: boolean = false)`

Removes a torrent from the Deluge client.

- **Parameters**:
  - `torrentHash`: `TorrentHash` - Hash of the torrent to remove
  - `removeData`: `boolean` (optional) - Whether to remove the downloaded data as well
- **Returns**: `Promise<boolean>`

## Development

To set up the development environment:

1. Clone the repository
2. Run `npm install`
3. Use the following commands:
   - `make dev`: Run the development server
   - `make test`: Run tests
   - `make lint`: Run linter
   - `make build`: Build the project

For testing purposes, you can use the official Deluge Docker image. To run a Deluge instance:

```bash
docker run -d \
  --name=deluge \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e DELUGE_LOGLEVEL=error `#optional` \
  -p 8112:8112 \
  -p 6881:6881 \
  -p 6881:6881/udp \
  -p 58846:58846 `#optional` \
  -v /path/to/deluge/config:/config \
  -v /path/to/downloads:/downloads \
  --restart unless-stopped \
  lscr.io/linuxserver/deluge:latest
```

This will start a Deluge instance that the tests can use. Make sure to adjust the paths and port mappings as needed for your environment.

**I'm not sure why, but this only starts working after first logging in once in the web ui (localhost:8112, default password 'deluge')**

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find any bugs or have feature requests, please create an issue on the [GitHub repository](https://github.com/Boelensman1/deluger/issues).
