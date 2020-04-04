const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const PORT = 3000;

const app = express();


app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
let connectionURI;
if (process.env.MONGODB_URI) {
  console.log(process.env);
  console.log(process.env.MONGODB_URI);
  connectionURI=process.env.MONGODB_URI;
}
  else {
    connectionURI="mongodb://localhost/budget";
  }
console.log(connectionURI)
mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});