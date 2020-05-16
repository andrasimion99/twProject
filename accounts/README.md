# TW PROJECT API - ACCOUNTS

## Response structure

The structure of the API responses' body is as follows:

-   for successful responses, a JSON object containing the properties:
    -   `status`: `success`
    -   `data`: An object, structure detailed for each route below.
-   for unsuccessful responses, a JSON object containing the
    properties.
    -   `status`: `fail`
    -   `error`: An object containing a `message` property, and
        sometimes additional helpful properties.


## /api/users

### GET

Get the all the users from the db.

**Query parameters**:

-   token - It will return only the user with that token.

**Return codes**:

-   200 - OK
-   400 - There was a problem fetching data

**Usage example**:  
 `localhost:3002/api/users`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": [
      {
         "userType": "user",
         "token": null,
         "restricted": false,
         "_id": "5eba65e5f167ce03401fd428",
         "email": "filimon.raluca@gmail.com",
         "password": "$2a$08$oE6bzdKTEMXTHZIVRFgb7.X2ytw51ELeYF69QGfKJyc7LSDfLPTje",
         "__v": 0
      },
      {
         "userType": "user",
         "token": null,
         "restricted": false,
         "_id": "5eba6ca9f167ce03401fd429",
         "email": "ralucik_2006@yahoo.com",
         "password": "$2a$08$1R/RQ6FIGJ8Rj1BmU1hHN.V3uEF6T/UCu1uZdSFYCXh4LwPFzNOWy",
         "__v": 0
      }
   ]
}
```

## /api/users/register

### POST

Post a user with an email and a password into db.

**Request body**

```JSON
{
	"email": "andrasi@gmail.com",
	"password": "andra"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/register`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "userType": "user",
      "token": null,
      "restricted": false,
      "_id": "5ebfc318ba921b58b838ce61",
      "email": "andrasi@gmail.com",
      "password": "$2a$08$4iY0wY/E4K9wtCroNhWFSO.3qw9d/tyOK.GGGmGbTlW89dfVuYnwK",
      "__v": 0
   }
}
```

## /api/users

### DELETE

Deletes all users from db.

**Return codes**:

-   204 - NO_CONTENT
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users`

**Returned data example**:

```JSON

```

## /api/users/login

### POST

Generates and sets the token for an user from db.

**Request body**

```JSON
{
	"email": "andrasi@gmail.com",
	"password": "andra"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/login`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "userType": "user",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJmYzMxOGJhOTIxYjU4YjgzOGNlNjEiLCJpYXQiOjE1ODk2MjYxMzV9.4fcDes2z80SwE8hTQejBq8UlmFUw1tRj6anD_dEEnM4",
      "restricted": false,
      "_id": "5ebfc318ba921b58b838ce61",
      "email": "andrasi@gmail.com",
      "password": "$2a$08$4iY0wY/E4K9wtCroNhWFSO.3qw9d/tyOK.GGGmGbTlW89dfVuYnwK",
      "__v": 0
   }
}
```

## /api/users/logout

### POST

Removes the token for an user from db.

**Request body**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJmYzMxOGJhOTIxYjU4YjgzOGNlNjEiLCJpYXQiOjE1ODk2MjYxMzV9.4fcDes2z80SwE8hTQejBq8UlmFUw1tRj6anD_dEEnM4"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/logout`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "n": 1,
      "nModified": 1,
      "opTime": {
         "ts": "6827392906936975364",
         "t": 18
      },
      "electionId": "7fffffff0000000000000012",
      "ok": 1,
      "$clusterTime": {
         "clusterTime": "6827392906936975364",
         "signature": {
            "hash": "EmxZqAkQ1tTeKVg0HivgEIvmMxU=",
            "keyId": "6796929880727486466"
         }
      },
      "operationTime": "6827392906936975364"
   }
}
```

## /api/users/profile

### POST

Adds information about the user profile in db.

**Request body**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJmYzMxOGJhOTIxYjU4YjgzOGNlNjEiLCJpYXQiOjE1ODk2MjY0ODB9.uxvkoOXiPIH4Oe25RQt6MD1V9QBHEtCfet7FQXDcdBU",
	"firstName": "Andra",
	"lastName": "Simion"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/profile`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "n": 1,
      "nModified": 1,
      "opTime": {
         "ts": "6827394131002654722",
         "t": 18
      },
      "electionId": "7fffffff0000000000000012",
      "ok": 1,
      "$clusterTime": {
         "clusterTime": "6827394131002654722",
         "signature": {
            "hash": "73QSrPARPY2uIYMlLLuCU4Aa33I=",
            "keyId": "6796929880727486466"
         }
      },
      "operationTime": "6827394131002654722"
   }
}
```

## /api/users/changePassword

### POST

Change the password for an authenticated user.

**Request body**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJmYzMxOGJhOTIxYjU4YjgzOGNlNjEiLCJpYXQiOjE1ODk2MjY0ODB9.uxvkoOXiPIH4Oe25RQt6MD1V9QBHEtCfet7FQXDcdBU",
	"currentPassword": "andra",
	"newPassword": "parola"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/changePassword`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "userType": "user",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJmYzMxOGJhOTIxYjU4YjgzOGNlNjEiLCJpYXQiOjE1ODk2MjY0ODB9.uxvkoOXiPIH4Oe25RQt6MD1V9QBHEtCfet7FQXDcdBU",
      "restricted": false,
      "_id": "5ebfc318ba921b58b838ce61",
      "email": "andrasi@gmail.com",
      "password": "parola",
      "__v": 0,
      "firstName": "Andra",
      "lastName": "Simion"
   }
}
```

## /api/users/restrict

### POST

An admin can restrict an user with this route.

**Request body**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJiZmVmMmU1Mjk0MjM1M2MzZDI0ZmIiLCJpYXQiOjE1ODk0NjAxNzh9.s0dzXqTGGgbXQono-xXYarUbm6q1-5uu7k6en1VJePQ",
	"email": "andrasi@gmail.com"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/restrict`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "n": 1,
      "nModified": 1,
      "opTime": {
         "ts": "6827396652148457473",
         "t": 18
      },
      "electionId": "7fffffff0000000000000012",
      "ok": 1,
      "$clusterTime": {
         "clusterTime": "6827396652148457473",
         "signature": {
            "hash": "3H76Nk4T1FHuy04aEhk3CpYAcNA=",
            "keyId": "6796929880727486466"
         }
      },
      "operationTime": "6827396652148457473"
   }
}
```

## /api/users/unrestrict

### POST

An admin can unrestrict an user with this route.

**Request body**

```JSON
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJiZmVmMmU1Mjk0MjM1M2MzZDI0ZmIiLCJpYXQiOjE1ODk0NjAxNzh9.s0dzXqTGGgbXQono-xXYarUbm6q1-5uu7k6en1VJePQ",
	"email": "andrasi@gmail.com"
}
```

**Return codes**:

-   201 - CREATED
-   400 - Bad Request

**Usage example**:  
 `localhost:3002/api/users/unrestrict`

**Returned data example**:

```JSON
{
   "status": "success",
   "data": {
      "n": 1,
      "nModified": 1,
      "opTime": {
         "ts": "6827396811062247425",
         "t": 18
      },
      "electionId": "7fffffff0000000000000012",
      "ok": 1,
      "$clusterTime": {
         "clusterTime": "6827396811062247425",
         "signature": {
            "hash": "/IoMsXkq/lLqepyWy3ZZyp39JOM=",
            "keyId": "6796929880727486466"
         }
      },
      "operationTime": "6827396811062247425"
   }
}
```