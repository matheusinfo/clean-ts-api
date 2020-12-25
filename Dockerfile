FROM node:12
WORKDIR /usr/src/clean-ts-api
RUN npm install --only=prod