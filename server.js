const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

console.log("Hello world");

app.listen(process.env.PORT, () =>
  console.log("Listening to port" + process.env.PORT)
);
