const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_URL;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log("Mongodb connection error", error);
  });
