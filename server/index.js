const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}/ server is on`);
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../dist/index.html'));
});
