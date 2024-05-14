const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const ImageRouter = require("./routes/image.routes");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

const uri = "mongodb://127.0.0.1:27017/react-starter-test";
mongoose.connect(uri).then(
  () => {
    console.log("Connection is Successful");
  },
  (err) => {
    console.error("Connection to mongodb is error", err?.message);
  }
);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/image", ImageRouter);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
