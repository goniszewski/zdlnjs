# zdlnjs

This repository contains a **Node.js** server created with **Express** which allows mocked users to authorize, generate keypair, and encrypt requested (or default) file.

## Prerequisites

- Node.js => 12
- npm (with yarn)

## Setup

Follow the below steps.

### Clone the repo

`git clone https://github.com/goniszewski/zdlnjs.git`

`cd zdlnj`

### Install required packages

In terminal execute `yarn` and wait for it to finalize the installation process.

### Run server

Execute command `yarn start`. `Server has started on port <NUMBER>` message should appear.

## Endpoints

### [POST] `/api/sign-in`

Accepts JSON with user credentials (example below) and returns token.

```json
{
  "email": "<EMAIL>",
  "password": "<PASSWORD>"
}
```

Output:

```json
{
  "authToken": "<TOKEN>"
}
```

### [GET] `/api/generate-key-pair`

Returns JSON response with pair of public and private keys (example below).

```json
{
  "privKey": "-----BEGIN ENCRYPTED PRIVATE KEY----- ...",
  "pubKey": "-----BEGIN PUBLIC KEY---- ..."
}
```

### [GET] `/api/encrypt` (use above request first)

Returns encrypted file's details (encrypted file and encrypted key) needed to decrypt the file (with `privKey`). Needs the keys to be previously generated for the user using `/api/generate-key-pair` endpoint.

#### Optional

This endpoint accepts optional URL parameter `?url=` which requires a `http://...` link to a choosen (and publicly available) file.

**NOTE:** if not used, the sample file's URL will be used (`http://www.africau.edu/images/default/sample.pdf` by default).

## Config files

Use default configuration (check `src/env/env.js`) or specify your own by creating a `.env` file based on provided `.env_sample` (located in `src/env/`).

## Mocked users

For purpose of this server a mocked users data is provided. Head to `src/mockup-data/index.js` to see user defails (passwords are hashed).

To sign in to server use [POST] `/api/sign-in` endpoint, and use credentials for one of the users:

#### User 1

```json
{
  "email": "test@test.pl",
  "password": "test1"
}
```

#### User 2

```json
{
  "email": "test2@test.pl",
  "password": "test2"
}
```
