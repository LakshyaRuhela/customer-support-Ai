import { connect } from "mongoose";

const mongo_Url = process.env.MONGODB_URI;
if (!mongo_Url) {
  // Fail fast so the developer sees a clear error in server logs
  throw new Error(
    "MONGODB_URI environment variable is required. Add it to .env.local",
  );
}

//  Cache to avoid reconnecting mongoDb
let cache: any = (global as any).mongoose;
if (!cache) {
  cache = (global as any).mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  // check previous conn
  if (cache.conn) {
    return cache.conn;
  }

  // if both are none then connect the db to url by inbuild connect function ,
  // if promise resolve then connect
  if (!cache.promise) {
    cache.promise = connect(mongo_Url!, {
      // Explicitly use a supported write concern for this cluster.
      writeConcern: { w: 1 },
      readConcern: { level: "local" },
    }).then((c) => c.connection);
  }

  //   try to get connnection if exists
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
  return cache.conn;
};

export default connectDb;
