FROM node:14
WORKDIR /usr/src/app/storage
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 6379
CMD ["npm","start"]

#docker build . -t database
