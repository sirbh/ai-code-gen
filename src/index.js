import OpenAI from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});


openai.chat.completions.create({
    model:"gpt-3.5-turbo",
    messages:[{
        role:"user",
        content:`write a expressjs controller for the following openAPI spec
        
        openapi: 3.0.1
        info:
          title: User Management API
          description: A simple API to get a user by ID.
          version: 1.0.0
        servers:
          - url: https://api.usermanagement.com/v1
            description: Main (production) server
          - url: http://localhost:8080/v1
            description: Local development server
        paths:
          /users/{userId}:
            get:
              summary: Get a user by ID
              parameters:
                - in: path
                  name: userId
                  required: true
                  schema:
                    type: string
                  description: The ID of the user to retrieve
              responses:
                '200':
                  description: A user object
                  content:
                    application/json:
                      schema:
                        $ref: '#/components/schemas/User'
                '404':
                  description: User not found
        components:
          schemas:
            User:
              type: object
              properties:
                id:
                  type: string
                  description: The unique identifier for the user
                name:
                  type: string
                email:
                  type: string
                  format: email`
    }]
}).then((response) => {
    console.log("response");
    console.log(response.choices);
}).catch((error) => {
    console.log("error");
    console.log(error);
});
