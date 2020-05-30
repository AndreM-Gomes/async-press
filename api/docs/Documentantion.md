# Documentation

  This is the docs for server endpoints. Some resources need authentication and they are marked with '-'. Public endpoints are marked with '+'. Endpoints that require authentication makes the changes associated with authenticated user (Example: POST on /posts create post that the owner is the authenticated user).

## Authentication (can change)

  Authentication can only be done after signup user. After get the JSON Web Token, in the header, set authorization as 'Bearer ' + token.

### + POST /user/signup
  Description: register an user with given data

  #### Request:
  
  **MIME type:** _application/json_
  **body**:
  ```javascript
  {
     name: string,
     password: string,
     email: string,
     username: string
  }
  ```

  #### Response:

  **status**:201 (Created)
  **body**:
  ```javascript
  {
    username: string,
    //signed token with HS256, expiration: 1h
    token: jsonwebtoken
  }
  ```

### + POST /user/login

  Request:

  **MIME type:** _application/json_ 
  **body:**
  ```javascript
  {
    username: string,
    password: string
  }
  ```

  #### Response:

  **status**:200 (OK)
  **body**:
  ```javascript
  {
    username: string,
    //signed token with HS256, expiration: 1h
    token: jsonwebtoken
  }
  ```

  Failed:
  **status**:401 (Unauthorized)

## Posts

### - POST /post
  **Description:** create a posts with authenticated user as owner

  #### Request:

  **MIME type:** _application/json_
  **body:**
  ```javascript
  {
    //Length: 75, Not null
    title: string,
    minsToRead: number,
    content: string
  }
  ```

  #### Response:
  
  **status:** 201 (Created)
  
### + GET /post/:username
  **Description:** get posts of User with given username

  **Path parameter:** username of determined User
  #### Request:
  **MIME type:** _application/json_

  #### Response:
  **status:** 200 (OK)
  **body:**
  ```javascript
  [
    {
      id: number,
      title: string,
      minsToRead: number,
      content: string,
      likesNumber: number,
      createdAt: Date
    }
  ]
  ```

### + GET /post/latest
  **Description:** get latests posts

  **Query parameter:** ```page: number```. Obs. Page count is begun in zero. Each page contains maximun of ten posts.

  #### Request:
  **MIME type:** _application/json_

  #### Response:
  **status:** 200 (OK)
  **body:**
  ```javascript
  [
    {
      id: number,
      title: string,
      minsToRead: number,
      content: string,
      likesNumber: number,
      createdAt: Date
    }
  ]
  
  ```
