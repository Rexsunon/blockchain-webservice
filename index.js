const express = require('express');
const http = require('http');

class BlockApi {
  constructor() {
    this.app = express();
    this.PORT = 5000 || process.env.PORT;
    this.server;
    this.initMiddelware();
    this.initControllers();
    this.setupServer();
    this.startServer();
  }

  initMiddelware() {
    this.app.use(express.json());
  }

  initControllers() {
    require('./controller/blockcontroller')(this.app);
  }

  setupServer() {
    this.server = http.createServer(this.app);
  }

  startServer() {
    this.server.listen(this.PORT, () =>
      console.log(`Server running on port ${this.PORT}`)
    );
  }
}

new BlockApi();
