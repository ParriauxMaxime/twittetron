import { config } from "dotenv";
config();

import { client } from "api/twitter/twitter";
import express from "express";
import { Tweet } from "core/models/tweet";

const port = process.env.PORT || 5000;
const app = express();

// Allow CORS
app.use((req, res, next) => {
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
    stream.on("data", (tweet: Tweet) => {
      res.write("id: " + track + "\n");
      res.write("data: " + JSON.stringify(tweet) + "\n\n");
    });

    stream.on("error", (error: any) => {
      console.error(error);
      res.end();
      (stream as any).destroy();
      // stream.removeAllListeners();
      // res.send(error);
    });
    res.on("close", () => {
      (stream as any).destroy();
    });
  });
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
