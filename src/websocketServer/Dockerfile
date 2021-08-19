FROM node:alpine
WORKDIR /usr/src/app/websocketServer
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3001
CMD ["npm","start"]

#docker build . -t websocket
