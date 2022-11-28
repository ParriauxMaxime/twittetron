import { config } from "dotenv";
config();

import express from "express";
import { client } from "api/twitter/twitter";
import { EventEmitter } from "events";

interface DestroyableEventEmitter extends EventEmitter {
  destroy(): void;
}

const port = process.env.PORT || 5000;
const app = express();

// Allow CORS
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/track/:track", (req, res) => {
  const { track } = req.params;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  // Retry every 5 seconds on connection lost
  res.write("retry: 5000\n\n");

  client.stream("statuses/filter", { track }, (stream) => {
    // Believe it or not, the forked package actually expose a destroy method
    // which is not implemented by  EventEmitter
    //https://github.com/jdub/node-twitter#streaming-api-stable
    const destroyableStream = stream as DestroyableEventEmitter;

    destroyableStream.on("data", (tweet) => {
      res.write("id: " + track + "\n");
      res.write("data: " + JSON.stringify(tweet) + "\n\n");
    });

    destroyableStream.on("error", (error) => {
      console.error(error);
      destroyableStream.destroy();
      res.end();
    });

    res.on(`close`, () => {
      destroyableStream.destroy();
    });
  });
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
