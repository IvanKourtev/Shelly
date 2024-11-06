# Webhook Service

This Webhook Service provides an API to manage and trigger webhooks. It supports operations such as creating, retrieving, updating, and deleting webhooks, as well as triggering them with dynamic data input. The service performs token replacement in URLs when triggering webhooks, allowing for flexible and customizable URLs based on input data.


# Features

**Create, Read, Update, Delete (CRUD) Operations:** *Manage webhooks efficiently.*
**Webhook Triggering:** *Supports triggering webhooks with dynamic data.*
**Rate Limiting:** *Limits the number of requests to prevent abuse.*
**Token Replacement:** *Replaces tokens in URLs when triggering webhooks with dynamic data.*
**Swagger Documentation:** *API documentation is available through Swagger for easier testing and interaction.*
**JSON-Based Communication:** *All communication is done using JSON.*

## Create
*Create a new webhook.*

POST - /api/webhooks
   

     {
          "name": "string",
          "enable": true,
          "urls": [you can use urls from https://webhook.site]
        }

## Read
*Retrieve a list of all webhooks.*

GET /api/webhooks

## Read by ID
*Retrieve a specific webhook by ID.*

GET /api/webhooks/{id}

## Update
*Update an existing webhook.*

PUT /api/webhooks/{id}

    {
      "name": "string",
      "enable": true,
      "urls": [you can use urls from https://webhook.site]
    }

## Delete
*Delete a webhook by ID.*

DELETE /api/webhooks/{id}

## Trigger
*Trigger a specific webhook with custom data.*

POST /api/webhooks/{id}/trigger

    {
     "data": { "userId": 123, "action": "create" }
    }

# Rate Limiting
The service uses express-rate-limit to protect against abuse. The rate limit is set to 1000 requests per 15 minutes.

# Swagger API Documentation
*The Swagger documentation provides an interactive interface for testing all available API endpoints.*

***Swagger is used to document the API, and you can access the documentation when the app is running by navigating to:*** http://localhost:3000/api-docs


