import mongoose from "mongoose";

export default function dbConn() {
  mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo Connected");
    })
    .catch((e) => {
      console.log("Mongo Error : ", e);
    });
}
