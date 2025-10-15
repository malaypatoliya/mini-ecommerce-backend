const express = require("express");
require("dotenv").config();
const db = require("./db/models");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const path = require("path");
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

app.use("/api/v1", routes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
