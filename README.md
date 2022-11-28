# Twittetron
Technical challenge for Metron

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<br />

# Get started
- First, setup and fill environment variables in `./server/.env` file.  
You can use the `.env.template` as shown below

```
cp ./server/.env.template ./server/.env
```


## Docker
Default configuration will bind ports 5000 and 3000

```
docker-compose up
```

<br />

## Development

- ### Server (listen on port 5000)
  ```
    yarn start
  ```

- ### Client (listen on port 3000)
  ```
    yarn start
  ```