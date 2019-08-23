## DESCRIPTION

Created sample demo to showcase the basic concept of JWT tokens.
Below are packages used for it

```
    "bcrypt": "^3.0.6",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.4",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1"
```

## SET UP

Clone the project and run the below commands to start with demo

```
jwt>npm install
jwt>npm start
```

Access the below url to see the home page

```
http://localhost:3010/
```

Access below url to authenticate the user

```
http://localhost:3010/login?user=guest&pass=guest
```

You can add more users in users.auth.json file.

You can trigger ajax request by click on button, inspect the token being send to server.

## BASIC CONCEPT OF JWT

A JSON Web Token (JWT) is a JSON object that is defined in RFC 7519 as a safe way to represent a set of information between two parties. The token is composed of a header, a payload, and a signature.
Simply put, a JWT is just a string with the following format:
header.payload.signature

- The header component of the JWT contains information about how the JWT signature should be computed. The header is a JSON object in the following format:
```
{
    "typ": "JWT",
    "alg": "HS256"
}
```
"typ" -> specifies JWT object

"alg" -> specifies hashing algorithm

- The payload component of the JWT is the data that‘s stored inside the JWT 
```
{
    username: user,
    password: pwd_hash   
}
```
In our example, the server creates a JWT with the user information stored inside of it, specifically the user ID and hashed password.

- The signature is computed using header and the payload created in above steps

For example in our case
```
// header being hashed as
eyerer22iOiJKV1QiLCJhbGciOiJIUzISDEA9
// payload being hashed as
eyJ1c2VySWQi345iMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0RfePdfdfe
```

After combining head and payload  JWT signature will be like
```
-xN_h82PHVTCMA9vdoHrcZxH-x78895y1537t3rGzcM
```

- Finally JWT token will be
header.payload.signature
```
eyerer22iOiJKV1QiLCJhbGciOiJIUzISDEA9.eyJ1c2VySWQi345iMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0RfePdfdfe.-xN_h82PHVTCMA9vdoHrcZxH-x78895y1537t3rGzcM
```
