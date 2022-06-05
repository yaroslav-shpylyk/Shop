FROM node:16-alpine
WORKDIR /usr/src/server
COPY . .
RUN npm install
RUN npm run build
WORKDIR /usr/src/server/dist

EXPOSE 8080
CMD ["node", "server.js"]