FROM node:16-alpine
WORKDIR /usr/src/client
COPY ../client1 .
RUN npm install
RUN npm run build --prod
