const SHA256 = require('crypto-js/sha256');
const BlockClass = require('../models/Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {
  /**
   * Constructor to create a new BlockController, you need to initialize here all your endpoints
   * @param {*} app
   */
  constructor(app) {
    this.app = app;
    this.blocks = [];
    this.initializeMockData();
    this.getBlockByIndex();
    this.postNewBlock();
  }

  /**
   * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
   */
  getBlockByIndex() {
    this.app.get('/api/block/:index', (req, res) => {
      const block = this.blocks[req.params.index];

      if (!block) {
        return res.status(404).json({
          success: false,
          data: `No block with at index ${req.params.index}`,
        });
      }

      res.status(200).json({
        success: false,
        data: block,
      });
    });
  }

  /**
   * Implement a POST Endpoint to add a new Block, url: "/api/block"
   */
  postNewBlock() {
    this.app.post('/api/block', (req, res) => {
      const { data } = req.body;

      if (data === '' || data === undefined) {
        return res.status(404).json({
          success: false,
          data: `data cant be empty`,
        });
      }

      this.setBlock(data);

      res.status(404).json({
        success: false,
        data: this.blocks,
      });
    });
  }

  setBlock(data) {
    let blockAux = new BlockClass.Block(data);
    blockAux.height = index;
    blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
    this.blocks.push(blockAux);
  }

  /**
   * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
   */
  initializeMockData() {
    if (this.blocks.length === 0) {
      for (let index = 0; index < 10; index++) {
        this.setBlock(`Test Data #${index}`);
      }
    }
  }
}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => {
  return new BlockController(app);
};
