# Parking system

### Description
The system is designed with an objective to meet the requirements of controlled parking that offers effortless parking tactics to the authorities. So when a vehicle about to park the authorities can check whether any parking slot is empty or not accordingly it gets park (if any). 


### Features
- Authenticate user ( ~POST /api/v1/login )
- Park vehicle      ( ~POST /api/v1/park )
- Unpark vehicle    ( ~DELETE /api/v1/unpark/:license )
- Get parking details ( ~GET /api/v1/park )
- Get slot details ( ~GET /api/v1/slot/:slotId )

### In order to see the api postman collection please visit the below postman collection url

Collection link - https://documenter.getpostman.com/view/24430327/2s8ZDVbPgs

## Installation

```bash
$ npm install
```

## Setup a .env file in the root of your project.

- Create a new .env file in the root directory  (/project-drop/.env)
- Copy the configuration details from .env.example file
- Paste it in .env file and update values

### Steps

```bash
# copy .env.example file
PORT=
PARKINGSIZE=
SECRETKEY=
RATE_LIMIT_PER_SECOND=

# paste it in .env file and update values
PORT=3000
PARKINGSIZE=5
SECRETKEY=secret_key
RATE_LIMIT_PER_SECOND=10
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### After successfully running the application please use the below base url to check the endpoints 
```bash
Application base url - http://localhost: {port}/
```
#### Examples

```bash
# Parking api url
http://localhost:{port}/api/v1/park
```

## Login

In order to test the application user need to login in the system and generate the jwt token.
User can use the below username and password to login.

### Users
```bash
username: "User1",
password: "admin",

username: "User2",
password: "admin",

username: "User3",
password: "admin",
```

### Login api

```http
POST /api/v1/login
```
```javascript
# Request (Use any above username and password)
{
    "username": "User3",
    "password": "admin"
}
```
```javascript
# Response
{
    "status": true,
    "data": "eyJhbGciO.eyJ1c2NlcjNAZ21haWwuY29tIiwiaWF0I.Bgum5V8jS4",
    "message": "Token generated successfully."
}
```

## Rate limiter 

- In .env file user can define how many request per second can be acceptable by the application.
- Default limit - 10 requests per second.

### Steps

```bash
# copy the RATE_LIMIT_PER_SECOND veriable from .env.example file
RATE_LIMIT_PER_SECOND=

# paste it in .env file and update values as per the requirement
RATE_LIMIT_PER_SECOND=10
```

## Testing the app 

```bash
# development
npm run test:e2e

# watch mode
npm run test:watch
```