# Steps to run this project locally

### `To clone this project run this command in terminal: git clone git@github.com:Chetankumar71297/assignment_be.git`

### `Note: I have used Mongodb Atlas to upload data. To run locally, a Mongodb atlas account is needed.`

### `Create .env file in project directory with values:`

CLIENT_ENDPOINT=http://localhost:3000 \
DATABASE_URL=(Mongodb Atlas database url) \
ACCESS_TOKEN_SECRET=(JWT token) \
REFRESH_TOKEN_SECRET=(JWT token) \
DEFAULT_PICTURE=(cloudinary link for default picture if image not provided at time of register) \
NODE_ENV=development

## Available Scripts

In the project directory, you can run:

### `npm install`

Install all dependencies.

### `npm run dev`

Runs the app with nodemon.

### `npm start`

Runs the app with node.

## `Link for frontend codebase:`

[https://github.com/Chetankumar71297/assignment_fe/tree/main](https://github.com/Chetankumar71297/assignment_fe/tree/main)

## `Live demo of the project:`

[https://assignment-fe.onrender.com](https://assignment-fe.onrender.com)

### `Note: Node backend is deployed on free tier provided by Render, so, server goes to sleep if not active for 15 minutes. It takes around 30-60 seconds to spin up the server,so after clicking the link just wait for some time.`
