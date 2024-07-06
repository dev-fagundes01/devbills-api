FROM node:18-alpine

WORKDIR /home/app

COPY . ./

RUN NPM I

EXPOSE 3333

CMD ["npm", "run", "dev"]