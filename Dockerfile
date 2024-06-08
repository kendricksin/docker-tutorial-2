FROM node:14

WORKDIR C:\Users\User\Docker Tutorial\docker-tutorial-2\app.js

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
