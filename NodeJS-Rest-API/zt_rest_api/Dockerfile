from node:19.1

WORKDIR /app
RUN apt-get update && apt-get install -y redis-server

COPY package.json .
RUN npm install
COPY . .
CMD node server.js
