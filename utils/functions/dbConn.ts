import mongoose from "mongoose";

export default function dbConn() {
  if (mongoose.connection.readyState) return;

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
