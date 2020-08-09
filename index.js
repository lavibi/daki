const express = require('express');

const server = express();

server.use('/', express.static(__dirname + '/dist/'));
server.listen(8088, () => {
  console.log('Server start at http:/127.0.0.1:8088');
});
