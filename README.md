# nodejs-crud-api

## Description

RS School Task. Nodejs simple CRUD API

## To run app:

`git clone git@github.com:DmirtyUsov/nodejs-crud-api.git`

`cd nodejs-crud-api`

`git switch dev`

`npm install`

## Scripts:

`npm run start:prod` to launch single server instance in production mode

`npm run start:dev` to launch single server instance in development mode

`npm run start:multi` to launch server in cluster mode with round-robin load balancer

`npm run test` to run tests (3 scenarios)

`npm run build`
## API

- **GET** `api/users` is used to get all users
  - Server answers with `status code` **200** and all users records
- **GET** `api/users/{userId}` gets user with provided `userId`
  - Server answers with `status code` **200** and user record with `id === userId` if it exists
  - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answers with `status code` **404** and corresponding message if user record with `id === userId` doesn't exist
- **POST** `api/users` creates new user and stores it in in-memory database

  - Server answers with `status code` **201** and newly created user record
  - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **PUT** `api/users/{userId}` updates existing user with provided `userId`

  - Server answers with `status code` **200** and updated user record
  - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answers with `status code` **400** and corresponding message if request `body` does not contain **required** fields
  - Server answers with `status code` **404** and corresponding message if user record with `id === userId` doesn't exist

- **DELETE** `api/users/{userId}` deletes existing user with provided `userId`
  - Server answers with `status code` **204** if the user record is found and deleted
  - Server answers with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answers with `status code` **404** and corresponding message if user record with `id === userId` doesn't exist

Bodies of **POST** and **PUT** requests **must be** in the following format:

- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

Requests to non-existing endpoints (e.g. `some-non/existing/resource`) are handled (server answers with `status code` **404** and corresponding human-friendly message)

Users are stored in in-memory database and have following properties:

- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)