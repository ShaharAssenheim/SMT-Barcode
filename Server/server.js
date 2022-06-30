require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;

//DB Connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DataBaase"));

app.use(express.json());
app.use(cors());

//Routes
const scanRouter = require("./routes/scanRoute");
const authRouter = require("./routes/authRoute");
app.use("/api/scan", scanRouter);
app.use("/api/auth", authRouter);

//for deploying server & client together.
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + '/build'));
    app.get('/*', (req, res) => {
      res.sendFile(__dirname + '/build/index.html');
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
