const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//localhost
// app.use(express.static("../angular-mongodb-app/dist/angular-mongodb-app/"));

//Docker server
app.use(express.static(__dirname + "/frontend/dist/angular-mongodb-app/"));

// MongoDB connection
mongoose
  .connect("mongodb://mongo/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log(
      "Something went wrong connecting to the Database: " + err.message
    );
  });

app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});

// development only
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
//

app.get("/", (req, res) => {
  //localhost
  // res.sendFile("./angular-mongodb-app/dist/angular-mongodb-app/index.html");

  //Docker server
  res.sendFile(__dirname + "/frontend/dist/angular-mongodb-app/index.html");
});

app.post("/api/users", async (req, res) => {
  const user = req.body;

  if (!user) {
    return res.status(400).send({ message: "Bad request" });
  }

  const userModelData = new User({
    name: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  try {
    await userModelData.save();
    res.status(200).send({ message: "User created successfuly" });
    console.log("User saved");
  } catch (err) {
    res.status(500).send({ message: "Server error" });
    console.log("Error saving user:", err);
  }

  // res.send("User created successfuly", JSON.stringify(user));
});

app.use(express.json());
