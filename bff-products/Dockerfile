FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "dev"]