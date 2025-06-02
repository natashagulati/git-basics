const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const TARGET = 'https://symposium.jkartik.in';

app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  ws: true,
  followRedirects: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('host', new URL(TARGET).host);
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Relay proxy running on http://localhost:${PORT}`);
});
