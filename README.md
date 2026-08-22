<a id="readme-top"></a>

<div align="center">
  <img 
    src="https://raw.githubusercontent.com/Mizuto911/jumble-api/main/assets/app-logo.png"
    alt="JumbleAPI Logo"
    width="300"  
  >
  <h1 align="center" style="border: none;">JumbleAPI</h1>
  <p align="center" style="margin-top: none;">Break your frontend before your users do.</p>
  <a href="https://github.com/Mizuto911/jumble-api/issues/new?template=bug_report.md&labels=bug">Report Bug</a> • <a href="https://github.com/Mizuto911/jumble-api/issues/new?template=feature_request.md&labels=enhancement">Request Feature</a>
  <br><br>
  <div>
    <a href="https://github.com/Mizuto911/jumble-api"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Mizuto911/jumble-api?style=for-the-badge&label=Forks"></a>
    <a href="https://github.com/Mizuto911/jumble-api"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Mizuto911/jumble-api?style=for-the-badge&label=Stars"></a>
    <a href="https://github.com/Mizuto911/jumble-api/issues"><img alt="GitHub Issues" src="https://img.shields.io/github/issues/Mizuto911/jumble-api?style=for-the-badge&label=Issues"></a>
    <a href="https://github.com/Mizuto911/jumble-api/blob/main/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/Mizuto911/jumble-api?style=for-the-badge&label=License"></a>
    <a href="https://www.linkedin.com/in/mizuto911/"><img alt="Static Badge" src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logoColor=white"></a>
  </div>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage-local-project-setup">Usage (Local Project Setup)</a></li>
        <li><a href="#usage-global-setup">Usage (Global Setup)</a></li>
        <li><a href="#response-payload">Response Payload</a></li>
      </ul>
    </li>
    <li><a href="#cli-options">CLI Options</a></li>
    <li>
      <a href="#schema-format">Schema format</a>
      <ul>
        <li><a href="#element-type-format-declaration">Element Type Format Declaration</a></li>
        <li><a href="#nested-objects-declaration">Nested Objects Declaration</a></li>
        <li><a href="#array-declaration">Array Declaration</a></li>
        <li><a href="#the-min-and-max-properties">The "min" and "max" Properties</a></li>
        <li><a href="#the-pickfrom-property">The "pickFrom" Property</a></li>
      </ul>
    </li>
    <li><a href="#schema-file-declaration">Schema File Declaration</a></li>
    <li>
      <a href="#api-endpoints">API Endpoints</a>
      <ul>
        <li><a href="#1-jumble">Jumble</a></li>
        <li><a href="#2-status">Status</a></li>
        <li><a href="#3-delay">Delay</a></li>
        <li><a href="#4-schemas">Schemas</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About the Project

JumbleAPI is a zero-config mock server designed to test how your frontend handles unpredictable real-world API behaviors. Beyond generating schema-driven JSON responses, JumbleAPI lets you inject deliberate chaos into your data layer—allowing you to easily test UI state resilience against response latency, unexpected status codes, missing properties, invalid data types, and corrupted keys.

### Features

- Generate random mock output from JSON schema definitions
- Support for random value types, arrays, `pickFrom` lists, and faker-powered mock formats
- Optional response mutation: missing fields, wrong types, malformed keys
- Dedicated endpoints for custom HTTP status and artificial delay
- Schema management API for create/read/update/delete operations

### Built With

- ![Static Badge](https://img.shields.io/badge/NodeJS-green?style=for-the-badge&logo=node.js&logoColor=white&link=https%3A%2F%2Fnodejs.org%2Fen)
- ![Static Badge](https://img.shields.io/badge/ExpressJS-yellow?style=for-the-badge&logo=express&logoColor=white&link=https%3A%2F%2Fexpressjs.com)
- ![Static Badge](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=TypeScript&logoColor=white&link=https%3A%2F%2Fwww.typescriptlang.org)
- ![Static Badge](https://img.shields.io/badge/FakerJS-red?style=for-the-badge&logo=Faker&logoColor=white&link=https%3A%2F%2Ffakerjs.dev)
- ![Static Badge](https://img.shields.io/badge/AJV-orange?style=for-the-badge&logo=Ajv&logoColor=white&link=https%3A%2F%2Fajv.js.org)

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## Getting Started

### Installation

#### Option 1: Local Project Set Up (Recommended)

```bash
npm install --save-dev jumble-api
```

#### Option 2: Global Installation

```bash
npm install -g jumble-api
```

### Usage (Local Project Setup)

#### 1. Run directly with `npx` (Local Project Setup)

```bash
npx jumble-api --port 3030 --schema src/schemas.js
```

This will run locally hosted API on `http://localhost:3030`.
This will also load the user defined schemas on the directory specified (_.js format_).

_Refer to `Schema Format` and `Schema File Declaration` section down below to learn how to define custom schemas._

#### 2. Run via `npm scripts` (Local Project Setup)

```json
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

#### 3. Call API Endpoint

```bash
curl http://localhost:3030/api/jumble
```

#### Output:

```json
// Default Schema
{
  "success": true,
  "data": {
    "id": "71a54855-9335-4902-bea7-20658f4a5440",
    "firstname": "Edgar",
    "lastname": "Keebler",
    "sex": "male",
    "email": "Angelo_Cruickshank77@gmail.com",
    "phone": "09232135085",
    "profilePic": "https://avatars.githubusercontent.com/u/1747281"
  }
}
```

### Usage (Global Setup)

#### 1. Run CLI directly (Global Setup)

```bash
jumble-api --port 3030 --schema ./schemas.js
```

### Response Payload

#### 1. Successful Response

```json
{
  "success": true,
  "data": { ... }
}
```

- **success**: Indicates the success of the response process.
- **data**: Contains the data generated from the schema.

#### 2. Unsuccessful Response

```json
{
  "success": false,
  "msg": "Error Message"
}
```

- **success**: Indicates the success of the response process.
- **msg**: Contains the error message returned by the process.

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## CLI options

- `--port`, `-p` — port number (default: `3030`)
- `--schema`, `-s` — schema directory or schema file path loaded at startup

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## Schema format

Schemas support either a simple type string or an object with optional properties:

- `format` — indicate format of data, you may select from the following:
  - primary types: `string`, `number`, `boolean`, and `date`; or
  - mock types: `fullname`, `firstname`, `lastname`, `sex`, `email`, `phone`, `url`, `imageUrl`, `avatarUrl`, `portrait`, `countryCode`, `address`, `color`, `zipcode`, `currency`, and `uuid`.
- `pickFrom` — select values from a provided list.
- `array` — a number or `{ min, max }` length definition.
- `min` / `max` — optional numeric bounds for generated values.
- `properties` — defines properties of object (can be used define nested objects).

### Element Type Format Declaration

Type of an element can be declared as a string passed onto a key or inside an object with the `format` key. The object type declaration allows for further customization of options.

```json
{
  "name": "fullname", // Simple Type String
  "email": {
    "format": "email" // Option Type Declaration
  }
}
```

### Nested Objects Declaration

Objects can be declared in a schema by passing an object with the `properties` key inside it.

_The `properties` key is a reserved keyword for declaring an object._

```json
{
  "name": "fullname",
  "gender": "sex",
  "nestedObject": {
    "properties": {
      // Declares Nested Object
      "nestedString": "string",
      "nestedNumber": "number"
    }
  }
}
```

As such, the whole schema can also be wrapped in the `properties` tag. (This allows customization of options to the schema itself).

```json
{
  "properties": {
    "name": "fullname",
    "age": "number",
    "email": {
      "format": "email"
    }
  }
}
```

### Array Declaration

Arrays can be declared in the schema by passing an `array` key like so.

```json
{
  "name": "fullname",
  "age": "number",
  "friends": {
    "array": 6, // Returns array of fullnames with length of 6
    "format": "fullname"
  },
  "posts": {
    "array": { "min": 5, "max": 10 }, // Returns array of objects with min length 5 and max length 10
    "properties": {
      "title": "string",
      "description": "string",
      "likes": "number"
    }
  }
}
```

If you want the response itself to be an array, it can be declared like so.

```json
{
  "array": 10, // Returns an array of 10
  "properties": {
    "name": "fullname",
    "age": "number",
    "posts": {
      "array": { "min": 5, "max": 10 },
      "properties": {
        "title": "string",
        "description": "string",
        "likes": "number"
      }
    }
  }
}
```

### The "min" and "max" Properties

The `min` and `max` properties in format type declarations function depending on what format it was used on. The formats it is used on are `number`, `string`, and `date`.

```json
{
  "sentence": {
    "format": "string", // For strings, these define the number of words to return
    "min": 10,
    "max": 20
  },

  "age": {
    "format": "number", // For numbers, these define the minimum and maximum value
    "min": 18,
    "max": 99
  },

  "createdAt": {
    "format": "date", // For dates, these define the minimum and maximum date range
    "min": "2026-09-11T12:00:00Z", // These accept either a valid ISO 8601 string or a UNIX Timestamp in Milliseconds
    "max": 1789128000000
  }
}
```

### The "pickFrom" Property

The `pickFrom` property in format type declaration is passed in an array and it defines the list of values to choose from and return. Users must use this if the values cannot be represented by existing format types.

```json
{
  "name": "fullname",
  "email": "email",
  "userType": {
    "pickFrom": ["admin", "user"] // Randomly chooses and returns from the list
  }
}
```

_If both `format` and `pickFrom` property is defined in the type, the `pickFrom` property will be prioritized._

<div align="right">(<a href="#readme-top">back to top</a>)</div>

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

### Example

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

### Referencing Schemas in Endpoints

To reference declared schemas, pass the schema ID as a query parameter in the endpoint url like this.

```
http://localhost:3030/api/jumble?schemaID=schema1
```

<div align="right">(<a href="#readme-top">back to top</a>)</div>

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

#### GET `api/delay/random`

Returns schema output. The response will be delayed by a random amount between 0 to 30 seconds.

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

### Notes

- While an endpoint for `schemas` exists, the changes made with this endpoint do not persist between runtimes (stopping the server and running it again). The most reliable way to define schemas is still defining it on `schemas.js` file and passing the path to the `--schema` option.

- For flexibility purposes purposes, each route for the `delay`, `status`, and `jumble` endpoint has a `POST` method equivalent with exact same functionality. Instead of referencing the schema through the `schemaID` query parameter, you may send the schema in the request body.

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

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## License

Distributed under the ISC License. See `LICENSE` for more information.

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## Contact

Masato Mizunuma - <a href="https://github.com/Mizuto911">GitHub</a> - <a href="https://www.linkedin.com/in/mizuto911/">LinkedIn</a> - <a href="mailto:masatomizunuma911@gmail.com">masatomizunuma911@gmail.com</a> <br>
Project Link: <a href="https://github.com/Mizuto911/jumble-api">https://github.com/Mizuto911/jumble-api</a>

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## Acknowledgements

- <a href="https://eytanmanor.medium.com/how-clis-in-node-js-actually-work-c26f913a335e">How CLIs in Node.js actually work</a>
- <a href="https://ajv.js.org/guide/getting-started.html">AJV JSON Schema Validator Documentation</a>
- <a href="https://expressjs.com">Express JS Documentation</a>
- <a href="https://fakerjs.dev/guide/">Faker JS Documentation</a>

<div align="right">(<a href="#readme-top">back to top</a>)</div>
