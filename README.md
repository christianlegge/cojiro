# ZOoTR Sim

Simulate and practice Ocarina of Time Randomizer seeds

## Postgres setup

This project uses [Postgres](https://www.postgresql.org) to persist data. To run the server locally, you must point it at a Postgres server, typically one running on the same machine. See below for an example URL.

## .env setup

You must create a .env file with the following keys (sensible defaults shown):

```.env
client/.env:
VITE_SERVER_URL=http://localhost:3001 # the url of the running server package

server/.env:
OOTRANDOMIZER_API_KEY= # api for the ootrandomizer service. at the time of writing this is NOT A PUBLIC API and there is no way to generate a key for yourself. at some point I will set up some kind of mock so people other than me can reasonably run the backend. until then you're on your own
PORT=3001 # must match the port from VITE_SERVER_URL above
CLIENT_URL=http://127.0.0.1:5173 # vite serves on port 5173 by default
JWT_SECRET=secret # key used to verify JWTs. it can be anything but it has to be something. crypto strength doesn't matter for a local setup
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/zootr-sim?schema=public # postgres database url. note that postgres:PASSWORD is a username:password and will be different depending on your setup
```

## Running locally

```bash
$ yarn
$ cd server && yarn prisma generate
$ cd .. && yarn dev
#or
$ npm install
$ cd server && npm run prisma generate
$ cd .. && npm run dev
```

The `prisma generate` command only has to be run once, and again every time you change the schema in `server/prisma/`. Otherwise just `yarn dev` in the root directory.

This starts both the client and server packages, located in the `client/` and `server/` directories. You can also run them individually with the same commands from those folders.
