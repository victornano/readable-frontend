This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Dependencies

- API Server - https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md

## Setup

- npm i
- Open src/ReadableApi.js and change the url constant to match your api-server url
- npm start

## Concerns

These are my main concerns about this project, please let me know if my reasoning is wrong:

- The api server provided doesn't contain a method to GET all comments in a single request. Since doing dozens of requests to put togheter a Comments Store didn't feel like a reasonable option, I decided to use component state for the comments.
- Similar to the previous concern, I didn't include the number of comments in the Post Listings. The ideal scenario would be for each post to bring that data, or having a Comments store.

