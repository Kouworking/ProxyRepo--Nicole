const express = require("express");
const app = express();
const port = 3005;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3001"
  });
});

app.all('/getAllImages', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3002"
  });
});

app.listen(port, () => console.log(`Proxy server running on port ${port}`));