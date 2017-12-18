This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Dependencies

- API Server - https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md

To install and start the API server, run the following commands in this directory:

* `npm install`
* `node server`


## Setup

- npm i
- Open src/ReadableApi.js and change the url constant to match your api-server url
- npm start

## Concerns

These are my main concerns about this project, please let me know if my reasoning is wrong:

- The api server provided doesn't contain a method to GET all comments in a single request. Since doing dozens of requests to put togheter a Comments Store didn't feel like a reasonable option, I decided to use component state for the comments.
- Similar to the previous concern, I didn't include the number of comments in the Post Listings. The ideal scenario would be for each post to bring that data, or having a Comments store.






MIT License

Copyright (c) 2017 Victor Montero Bonilla

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
