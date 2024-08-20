


FROM node:20

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3008

CMD [ "node", "server.js" ]