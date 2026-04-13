import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var __worldForumMongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global.__worldForumMongoClientPromise) {
      client = new MongoClient(uri);
      global.__worldForumMongoClientPromise = client.connect();
    }
    clientPromise = global.__worldForumMongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export function requireMongoClientPromise() {
  if (!clientPromise) throw new Error("Missing MONGODB_URI");
  return clientPromise;
}

export default clientPromise;

