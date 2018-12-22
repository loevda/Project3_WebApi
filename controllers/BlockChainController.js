/**
 * Created by david2099 on 22/12/18.
 */
const SHA256 = require('crypto-js/sha256');
const BlockChainClass = require('../models/BlockChain.js');

class BlockChainController {
    constructor(app) {
        this.app = app;
        this.chain = new BlockChainClass();
        this.getBlock();
        this.postBlock();
    }

    getBlock() {
        this.app.get("/block/:index", async (req, res) => {
            // Add your code here
            try {
                let block = await this.chain.getBlock(req.params.index);
                res.json(JSON.stringify(block));
            } catch(err) {
                res.json({"error": err.toString()});
            }
        });
    }

    postBlock() {
        this.app.post("/block/", async (req, res) => {
            // Add your code here
            res.json({"success": "true", "block": req.params.index});
        });
    }


}

module.exports = (app) => { return new BlockChainController(app);}