FROM node:18-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm i

COPY . ./

EXPOSE 3333

CMD [ "npm", "run", "dev" ]