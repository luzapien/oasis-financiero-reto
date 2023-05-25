const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const word = "example";

app.use(express.static(__dirname));

function getEntries(response) {
  const options = {
    hostname: "api.dictionaryapi.dev",
    port: 80,
    path: `/api/v2/entries/en/${word}`,
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const jsonResponse = JSON.parse(data);
      response.status(200).send({ message: "Ok", data: jsonResponse });
    });
  });

  req.on("error", (error) => {
    console.error(`Error making API request: ${error}`);
    response.status(500).send({ message: "Server error" })
  });

  req.end();
}

app.listen(port, () => {
  console.log(`Reto_02 Server is running in ${port}`);
});

app.get("/", (req, res) => {
  res.render(__dirname + "/index.html");
});

app.get("/entries", async (req, res) => {
  getEntries(res);
});
