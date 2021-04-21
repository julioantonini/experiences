FROM node:12.20.1-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
