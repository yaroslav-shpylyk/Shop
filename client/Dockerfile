FROM node:16-alpine
WORKDIR /usr/src/client
COPY . .
RUN npm install
RUN npm run build --prod
