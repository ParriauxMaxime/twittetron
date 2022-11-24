import { client } from "api/twitter/twitter";
import express from "express";
import { Tweet } from "core/models/tweet";

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/track/:track", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();
  client.stream("statuses/filter", { track: req.params.track }, (stream) => {
    stream.on("data", (tweet: Tweet) => {
      console.info(typeof tweet, "tweet");
      res.write("id: " + req.params.track + "\n");
      console.info(typeof tweet);
      res.write("data: " + JSON.stringify(tweet) + "\n\n");
    });

    stream.on("error", (error: any) => {
      stream.removeAllListeners();
      console.error(error);
      res.send(error);
    });
  });
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
