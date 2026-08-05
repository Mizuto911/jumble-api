# Jumble API

A lightweight Express-based mock data simulator for generating schema-driven JSON responses with optional malformed output, status code control, and response delay.

## Features

- Generate random mock output from JSON schema definitions
- Support for random value types, arrays, `pickFrom` lists, and faker-powered mock formats
- Optional response mutation: missing fields, wrong types, malformed keys
- Dedicated endpoints for custom HTTP status and artificial delay
- Schema management API for create/read/update/delete operations

## Requirements

- Node.js 20+ (recommended)
- npm

## Installation and Usage

### Option 1: Local Project Set Up (Recommended)

Install `jumble-api` as a project dependency:

```bash
npm install jumble-api
```

#### 1. Run directly with `npx`

```bash
npx jumble-api --port 3030 --schema src/schemas.js
```

This will run locally hosted API on `http://localhost:3030`.
This will also load the user defined schemas on the directory specified (_.js format_).

\*_Refer to `Schema Format` and `Schema File Declaration` section down below to learn how to define custom schemas._

#### 2. Run via `npm scripts`

```js
// package.json
{
  "name": "my-project",
  "scripts": {
    "mock:api": "jumble-api --port 3030"
  }
}
```

Then start your server anytime by running:

```bash
npm run mock:api
```

### Option 2: Global Installation

If you prefer to run the command from anywhere on your machine without adding it to a `package.json`:

```bash
npm install -g jumble-api
```

Then run the CLI directly:

```bash
jumble-api --port 3030 --schema ./schemas.js
```

## CLI options

- `--port`, `-p` — port number (default: `3030`)
- `--schema`, `-s` — schema directory or schema file path loaded at startup

## API Endpoints

All endpoints are mounted under `/api`.

### 1. Jumble

Generate schema-based JSON output.

#### GET `/api/jumble`

Query parameters:

- `schemaID` — optional schema identifier to use
- `missing=1` — remove some keys
- `wrongType=1` — use wrong types for some values
- `malformed=1` — corrupt some property names
- `probability=<number>` — probability of applying mutation logic (default: 1)

Response:

```js
{
  "success": true,
  "data": { ... }
}
```

#### GET `/api/jumble/random`

Generates output with random mutation flags and random probability.

### Example URL:

```
http://localhost:3030/api/jumble?missing=1&wrongType=1&malformed=1&probability=0.5&schemaID=schema1
```

### Output

```js
// Schema Input
{
  "name": "fullname",
  "age": {
    "format": "number",
    "min": 18,
    "max": 100,
  },
  "sex": "sex"
}

// Output (Missing "age" element)
{
  "success": true,
  "data": {
    "namd": "John Doe", // Malformed Element Key
    "sex": true // Wrong Data Type
  }
}
```

### 2. Status

Return schema output with custom or random HTTP status.

#### GET `/api/status/random`

Returns a random HTTP status code and schema output.

#### GET `/api/status/:status`

Returns schema output with the requested status code.

#### POST `/api/status/random`

Body should contain a schema object. Returns a random status code and generated output.

#### POST `/api/status/:status`

Body should contain a schema object. Returns output with the requested status code.

### Example URL:

```
http://localhost:3030/api/status/404
```

### Output:

```js
// Schema Input (schemaID=schema1)
{
  "name": "fullname",
  "age": {
    "format": "number",
    "min": 18,
    "max": 100,
  },
  "sex": "sex"
}

// Output (STATUS CODE = 404 NOT FOUND)
{
  "success": true,
  "data": {
    "name": "John Doe",
    "age": 56,
    "sex": "male"
  }
}
```

Not to be confused with an actual `404 NOT FOUND` response, in this case the `success` key will be `false`.

### Output:

```js
// Output (STATUS CODE = 404 NOT FOUND)
{
  "success": false,
  "msg": "Schema with ID 'schema1' does not exist."
}
```

### 3. Delay

Simulate response latency.

#### GET `/api/delay`

Query parameters:

- `schemaID` — optional schema identifier
- `value` — delay amount (default: `5000`)
- `units` — one of `ms`, `us`, `ns`, `s` (default: `ms`)

#### POST `/api/delay`

Body should contain a schema object. The response is delayed by the requested amount before sending.

### Example URL:

```
http://localhost:3030/api/delay?value=5&units=s&schemaID=schema1
```

### Output:

```js
// Schema Input (schemaID=schema1)
{
  "name": "fullname",
  "age": {
    "format": "number",
    "min": 18,
    "max": 100,
  },
  "sex": "sex"
}

// Output (Arrives after 5 seconds)
{
  "success": true,
  "data": {
    "name": "John Doe",
    "age": 56,
    "sex": "male"
  }
}
```

### 4. Schemas

Manage available schema definitions.

#### GET `/api/schema`

Returns all currently loaded schemas.

#### GET `/api/schema/:schemaID`

Returns a specific schema by ID.

#### POST `/api/schema`

Creates a new schema. Request body should be:

```js
{
  "schemaID": "mySchema",
  "schema": { ... }
}
```

#### PUT `/api/schema`

Updates an existing schema with the same request payload.

#### DELETE `/api/schema/:schemaID`

Deletes the schema with the given ID.

### Example URL:

```
http://localhost:3030/api/schema/schema1
```

## Schema format

Schemas support either a simple type string or an object with optional properties:

- `format` — indicate format of data, you may select from the following:
  - primary types: `string`, `number`, `boolean`, and `date`; or
  - mock types: `fullname`, `firstname`, `lastname`, `sex`, `email`, `phone`, `url`, `imageUrl`, `avatarUrl`, `portrait`, `countryCode`, `address`, `color`, `zipcode`, `currency`, and `uuid`.
- `pickFrom` — select values from a provided list.
- `array` — a number or `{ min, max }` length definition.
- `min` / `max` — optional numeric bounds for generated values.
- `properties` — defines properties of object (can be used define nested objects).

Example single object schema:

```js
const userSchema = {
  name: "fullname",
  sex: "sex",
  email: "email",
  userType: {
    pickFrom: ["admin", "user"],
  },
  friends: {
    array: 5, // can be omitted to return single non list element.
    properties: {
      name: "fullname",
    },
  },
};
```

Example array of objects schema:

```js
const userSchema = {
  array: { min: 5, max: 10 },
  properties: {
    name: "fullname",
    sex: "sex",
    email: "email",
    userType: {
      pickFrom: ["admin", "user"],
    },
  },
};
```

## Schema File Declaration

In the `--schema` param, the directory of your schema file is read by the application and registers it as available schema.

To declare a schemas file, create a JavaScript file and `export default` an object where each key is a `schemaID` (used to reference the schema in endpoints) and each value is the schema definition.

```js
export default {
  schemaID: {
    key: format,
  },
};
```

For example:

```js
export default {
  schema1: {
    name: "fullname",
    sex: "sex",
    email: "email",
  },

  schema2: {
    name: "fullname",
    sex: "sex",
    email: "email",
  },
};
```

After creating the file, pass its path to the `--schema` option when starting the API:

```bash
npx jumble-api --schema src/schemas.js
```

## Notes

- If `schemaID` is not provided, the API uses the default schema.

  Default Schema:

  ```js
  {
    id: "uuid",
    firstname: "firstname",
    lastname: "lastname",
    sex: "sex",
    email: "email",
    phone: "phone",
    profilePic: "avatarUrl",
  }
  ```

- Invalid query parameters or schema payloads return appropriate 4xx error responses.
