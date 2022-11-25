import Twitter from "twitter";

const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET } =
  process.env;

const envNotSet = [
  "CONSUMER_KEY",
  "CONSUMER_SECRET",
  "ACCESS_TOKEN_KEY",
  "ACCESS_TOKEN_SECRET",
].filter((env) => !process.env[env]);

if (envNotSet.length) {
  throw new Error(`Env variable not set : ${envNotSet.join(",")}`);
}

export const client = new Twitter({
  consumer_key: CONSUMER_KEY as string,
  consumer_secret: CONSUMER_SECRET as string,
  access_token_key: ACCESS_TOKEN_KEY as string,
  access_token_secret: ACCESS_TOKEN_SECRET as string,
});
