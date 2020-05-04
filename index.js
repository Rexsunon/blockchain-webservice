const express = require('express');
const http = require('http');

const app = express();

const { PORT = 5000 } = process.PORT;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
