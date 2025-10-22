# Cojiro

(formerly ZOoTR Sim)

Simulate and practice Ocarina of Time Randomizer seeds

Assuming the last commit is more than ~2 minutes old, the `main` branch of this repo has parity with the [cojiro.christianlegge.dev](https://cojiro.christianlegge.dev) deployment.

## Postgres setup

This project uses [Postgres](https://www.postgresql.org) to persist data. To run the server locally, you must point it at a Postgres server, typically one running on the same machine. See below for an example URL.

## .env setup

You must create a .env file with the following keys (sensible defaults shown). If you're missing them, the project won't start.

```.env
OOTRANDOMIZER_API_KEY= # api for the ootrandomizer service. at the time of writing this is NOT A PUBLIC API and there is no way to generate a key for yourself. at some point I will set up some kind of mock so people other than me can reasonably run the backend. until then you're on your own
JWT_SECRET=secret # key used to verify JWTs. it can be anything but it has to be something. crypto strength doesn't matter for a local setup
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/cojiro?schema=public # postgres database url. note that postgres:PASSWORD is a username:password and will be different depending on your setup
```

## Running locally

```bash
$ yarn
$ yarn dev
#or
$ npm install
$ npm run dev
```
