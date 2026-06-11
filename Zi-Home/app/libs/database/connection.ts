import { MongoClient } from "mongodb";

let client;

try {
  if (!process.env.DATABASE_URL) {
    throw new Error("MongoDB URI is required!");
  }

  client = new MongoClient(process.env.DATABASE_URL as string);
  client.connect();
} catch (e) {
  console.log(e);
}

export default client;
