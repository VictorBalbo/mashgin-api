# Simple Checkout System
This project is part of Mashgin Software Engineer assignment.

You can access the deployed projecy on https://mashgin-api.victorbalbo.com/ hosted by Vercel.


## Technologies used
- `node` as JS runtime
- `express` for web framework
- `TypeScript` for variables typing
- `Zod` for schema validation
- `Jest` for tests

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/).

## Relations
This project is a dependency for the [mashgin-webapp](https://github.com/VictorBalbo/mashgin-webapp). Also the published API can be found at https://mashgin-api.victorbalbo.com/.

## Project Setup
This project can run in two ways, using `Docker` or using `Node` commands

### Docker
To run this project using Docker you will need to have a `Docker Engine` and `Docker CLI` installed and running.
#### Build Image
```sh
docker build . -t mashgin-api
```
#### Run Image as Container
```sh
docker run -p 3000:3000 mashgin-api
```
This will run the webapp locally though `Docker` using port 3000. The app will run on http://localhost:3000/

### Node CLI
To run this project using Node you will need to have a `Node 18+` installed. You can check your node version using the command `node -v`.
#### Install Project Dependencies
```sh
npm install
```
#### Compile and Hot-Reload for Development
```sh
npm run dev
```
This will run the webapp locally using port 3000. The app will run on http://localhost:3000/

## Tests
This project uses `Jest` for unit tests of the controllers and business logic.
To run the tests just run the command:
```sh
npm run test
```

## What this API do
This API uses Swagger to document and present the endpoints.
Once the API is running locally you can check the docs on the at http://localhost:3000/docs/
