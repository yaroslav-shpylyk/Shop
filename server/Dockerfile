FROM node:16-alpine
WORKDIR /usr/src/server
COPY . .
RUN npm install
RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

EXPOSE 8080
CMD /wait && node ./dist/server.js