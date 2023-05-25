const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Reto_03 Server is running in ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/comparison.html");
});
