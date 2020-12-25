FROM node:12
WORKDIR /usr/src/clean-ts-api
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start