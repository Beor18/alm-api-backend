FROM node:12

WORKDIR /usr/docker-prueba/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000:3000
CMD [ "npm", "run", "dev"]