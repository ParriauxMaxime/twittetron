FROM node:18.12.1
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

EXPOSE 5000
RUN npm install
COPY . .

CMD [ "npm", "start" ]