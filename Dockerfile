FROM node:lts-stretch-slim

RUN mkdir -p /home/Service

WORKDIR /home/Service
USER root

COPY package*.json ./

RUN npm install --registry=https://registry.npm.taobao.org --production

COPY . .

EXPOSE 7001

CMD [ "npm", "run", "docker" ]

