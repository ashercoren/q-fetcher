const express   = require('express');
const http      = require('http');
const fetcher   = require('./fetch-urls.js');
const app       = express();
const port      = 3000;

app.use(express.static(`${__dirname}/public`));

app.get(`/`, (req, res) => {
  res.sendfile('./public/index.html');
});

app.get(`/data`, (req, res) => {
  fetcher().then(data=>{res.json(data)});
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log('Listening on %d', server.address().port);
});
