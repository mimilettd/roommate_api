# RoomieAPI

The RoomieAPI is primarily used to drive data to the <a href="https://github.com/mimilettd/roommate"><b>Roomie</b></a> application.

The API is REST API. All endpoints will return the data as JSON.

The following endpoints are available:

## Endpoints

### User Resources

#### `GET /users/`
  * Returns all users currently in the database

#### `GET /users/:id`
  * returns the user object with the specific `:id` you've passed in or 500 if the food is not found

#### `POST /users/`
  * allows creating a new user with the following required parameters:
```
{ name: name, email: email, password: password }
```
  * If user is successfully created (name, email, and password are required fields), the <b>user item</b> will be returned. If the user is not successfully updated, a 500 status code will be returned.
  
#### `PUT /users/:id`
  * allows updating an existing user with the following parameters:
```
name, email, password, gender, about, location, picture, occupation, smoker, pet_friendly, personality, smoker_ok, pet_ok, personality_preference, gender_preference
```
  * Parameters must be sent through the headers.
  * If user is successfully updated, the <b>user item</b> will be returned. If the user is not successfully updated, a 500 status code will be returned.
  
### Authentication Resources

#### `POST /api/auth/register`
  * allows creating a new user with the following required parameters:
```
{ name: name, email: email, password: password }
```
  * If user is successfully updated (name, email, and password are required fields), a <b>JSON web token</b> will be returned. If the user is not successfully updated, a 500 status code will be returned.

#### `POST /api/auth/login`
  * allows creating a new session with the following required parameters:
```
{ email: email, password: password }
```
  * If user is successfully logged in (email and password are required fields), a <b>JSON web token</b> will be returned. If the user is not successfully logged in, a 500 status code will be returned.
  
#### `GET /api/auth/me`
  * returns the user with the matching JSON web token provided. Must provide the following in the header:
```
{ x-access-token: token }
```
  * If the token is successfully authenticated, the user item will be returned. If the token is unable to be authenticated, either a 404 ("No user found") or 500 ("There was a problem finding the user") status code will be returned.

#### `GET /api/auth/logout`
  * Updates the token to NULL.
  
## Installing

1. Clone the repo and change into the roommate_api directory:

```
$ git clone https://github.com/mimilettd/roommate_api.git
$ cd roommate_api
```

2. Run the following commands in your terminal to start the server:

```
$ npm install
$ npm start
```

3. To hit the endpoints, use the following base URL:

```
http://localhost:3000
```

## Built With

  * Express (Node.js web application framework)
  * mongoose and MongoDB (database)
