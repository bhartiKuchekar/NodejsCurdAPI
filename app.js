const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/AlineDB";
const app = express();
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("Connected...");
});
app.use(express.json());
const alienRouter = require("./routers/aliens");
app.use("/aliens", alienRouter);
app.listen(3002, () => {
  console.log("server started..");
});
