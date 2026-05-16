# Minimalist Node.js Express Application in Docker

Initial code from https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## Build Docker image

To build manually:

    $ docker build -t brianfive/simple-express-docker:latest .
    $ docker login
    $ docker push brianfive/simple-express-docker:latest

## Running Docker image

    # run in foreground (ctrl-c to stop)
    $ docker run -p 44444:8080 -it brianfive/simple-express-docker

    # run in background as daemon
    $ docker run -p 44444:8080 -d brianfive/simple-express-docker

CI/CD test
