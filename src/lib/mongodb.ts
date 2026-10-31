import "server-only";

import { MongoClient } from "mongodb";

// Falls back to a local dev database so the app runs without any env vars.
// Set MONGODB_URI (e.g. a MongoDB Atlas connection string) in production.
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017";
const MONGODB_DB = process.env.MONGODB_DB ?? "studio-space";

// Fail fast when no database is running: the callers fall back to demo data
// instead of blocking page rendering for the driver's default 30s timeout.
const SERVER_SELECTION_TIMEOUT_MS = 1_500;

declare global {
  // Cache the client on `globalThis` so dev-server hot reloads keep a single
  // connection pool instead of opening a new one per reload.
  var __studioMongoClient: MongoClient | undefined;
}

/** Connects (once) to MongoDB and returns the application database. */
export async function getDatabase() {
  if (!globalThis.__studioMongoClient) {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
    });
    await client.connect();
    globalThis.__studioMongoClient = client;
  }

  return globalThis.__studioMongoClient.db(MONGODB_DB);
}
