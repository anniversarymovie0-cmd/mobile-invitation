const functions = require("firebase-functions");
const express = require("express");
const database = require("./wedding-data.json");

const app = express();

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  const data = database[id];

  if (!data) {
    res.status(404).json({ error: "Invitation not found" });
    return;
  }

  res.json(data);
});

app.get("/w/:id", (req, res) => {
  const id = req.params.id;
  const data = database[id];

  // version: 1.0.3

  if (!data) {
    res.status(404).send("Invitation not found");
    return;
  }

  const title = data.intro.title;
  const description = data.intro.date;
const image = "https://anniversarymovie.kr" + data.intro.thumbnail;
  const url = "https://anniversarymovie.kr/view/" + id;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="website" />
    <meta charset="utf-8" />
  </head>
  <body>
    <script>
  setTimeout(() => {
    window.location.href = "${url}";
  }, 100);
</script>
  </body>
  </html>
  `;

  res.send(html);
});

exports.invitation = functions.https.onRequest(app);