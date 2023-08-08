# Simple Checkout System
This project is part of Mashgin Software Engineer assignment.

You can access the deployed projecy on https://mashgin-api.victorbalbo.com/ hosted by Vercel.


## Technologies used
- `node` as JS runtime
- `express` for web framework
- `TypeScript` for variables typing
- `Zod` for schema validation

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/).

## Relations
This project is a dependency for the [mashgin-webapp](https://github.com/VictorBalbo/mashgin-webapp). Also the published API can be found at https://mashgin-api.victorbalbo.com/.

## Project Setup
This project can run in two ways, using `Docker` or using `Node` commands

### Docker
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
#### Install Project Dependencies
```sh
npm install
```
### Compile and Hot-Reload for Development
```sh
npm run dev
```
This will run the webapp locally using port 3000. The app will run on http://localhost:3000/


## What this API do
This API have 4 endpoints:

### GET /
This endpoint will just confirm the API is running

### GET /menu
This endpoint will return the menu.

As this is a just a simple exercise, this endpoint is returning the static values from `menu.json`

### GET /order
This endpoint will return the list of orders made.

As this is a just a simple exercise, this endpoint is returning the static values from a GIST.

### POST /order
This endpoint will receive an Order and save it.

As this is a just a simple exercise, this endpoint is saving the Order as a static values in a GIST.

An example of the request body:
```json
{
    "Items": [
        {
            "category_id": 1,
            "id": 3,
            "image_id": "95d02a230fe050",
            "name": "Muffin",
            "price": 1.25,
            "category_name": "Bakery",
            "quantity": 1
        }
    ],
    "Total": 1.25,
    "Payment": {
        "cardNumber": "1234567890123456",
        "expirationDate": "2023-08-07T01:08:30.677Z",
        "cvc": "321",
        "cardName": "dfgdfg"
    }
}
```

