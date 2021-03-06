/**
 * This file build static server for demo
 * Also there are some backend endpoints that will be served for backend task demo
 */

const express = require('express');

const server = express();

server.use('/', express.static(__dirname + '/dist/', {
  etag: false,
  maxAge: '0'
}));

server.post('/upload_true.json', (req, res) => {
  res.json({
    error: false,
    id: 34,
    file: 'media/ts_1597565206_9dd11db07f36870532cd_yunfan-xu-3B3oCC4h5xU-unsplash.jpg'
  })
})

server.get('/file/:id/delete', (req, res) => {
  res.json({
    error: false
  })
})

server.get('/thing/:tid/:id/delete', (req, res) => {
  res.json({
    error: false
  })
})

server.post('/form.json', (req, res) => {
  res.json({
    error: false
  })
})

server.listen(8088, () => {
  console.log('Server start at http:/127.0.0.1:8088');
});
