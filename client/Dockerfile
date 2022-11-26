FROM node:18.12.1
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 3000
RUN npm install
COPY . .

RUN npm run build

CMD [ "npm", "run", "serve" ]