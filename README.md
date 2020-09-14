# Userify

## Instructions to run
1. `clone https://github.com/kajoban/Userify.git`
2. `cd Userify` and `npm install`
3. `npm start`

## Instructions to Build and Run Docker Image
1. Follow instructions above.
2. To build image, `cd Userify` and `docker build . -t userify:latest`
3. To run container, `docker run --rm -it -p 8000:8000/tcp userify:latest`

## Acknowledgements 
[This tutorial](https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/) was incredibly helpful in learning SQLite and how to use it with Express.
[This tutorial](https://www.youtube.com/watch?v=i7ABlHngi1Q&ab_channel=TravisMedia) was incredibly helpful in learning Docker. 

## API Functionality

### Database schema

Field Name | Primary Key?
------------ | -------------
id | yes
name | no
email | no
password | no


### GET all users
`curl -X GET http://localhost:8000/api/users/`

### GET single user via id
`curl -X GET http://localhost:8000/api/users/:id`

### CREATE new user 
note: email and password required 
`curl -d "name=kajoban&email=kajoban@kajoban.ca&password=1234" -X POST http://localhost:8000/api/users/`

### UPDATE single user via id 
note: all fields optional
`curl -d "name=___&email=___&password=___" -X PATCH http://localhost:8000/api/users/:id`

### DELETE single user via id 
`curl -X DELETE http://localhost:8000/api/users/:id`

## Next Steps
1. Deploy API
2. Build GraphQL layer 



