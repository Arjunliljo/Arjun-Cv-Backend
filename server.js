const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = require("./app");

app.listen(PORT, () => console.log("Listening to port " + PORT));
