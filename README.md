# Project3_WebApi

This is Project 3, RESTful Web API with **Express Node.js Web Framework**.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run __npm start__ to run the server. Server is listening at **http://localhost:8000**.

##Endpoints

| endpoint       | method | description                               |   |   |
|----------------|--------|-------------------------------------------|---|---|
| /              | GET    | List of available endpoints               |   |   |
| /block/{index} | GET    | Return block at height of {number} index. |   |   |
| /block         | POST   | Add a new block to the blockchain. Payload takes either an url-encoded key/value pair (body=value) or a json object {'body': 'value'}.       |   |   |     

