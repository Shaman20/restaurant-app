const express = require("express");
require("dotenv").config();
const routes = require("./src/routes/userRoute");
const app = express();
const db = require("./src/models/db");
const userRoutes = require("./src/routes/userRoute");
const cors = require("cors");
const postRoutes = require('./src/routes/postRoute');
const friendRoutes = require('./src/routes/friendRoute')

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/v1/api/user/", userRoutes);
app.use("/v1/api/post/", postRoutes);
app.use("/v1/api/friend/", friendRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
