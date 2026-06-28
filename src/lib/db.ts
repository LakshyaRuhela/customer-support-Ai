import { connect } from "mongoose";

const mongo_Url = process.env.MONGODB_URI;
if (!mongo_Url) {
  console.log("Mongodb Url not found");
}

//  Cache to avoid reconnecting mongoDb
let cache = global.mongoose;
if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  // check previous conn
  if (cache.conn) {
    return cache.conn;
  }

  // if both are none then connect the db to url by inbuild connect function ,
  // if promise resolve then connect
  if (!cache.promise) {
    cache.promise = connect(mongo_Url!).then((c) => c.connection);
  }

  //   try to get connnection if exists
  try {
    cache.conn = await cache.promise;
  } catch (err) {
    console.log(err);
  }
  return cache.conn;
};

export default connectDb;
