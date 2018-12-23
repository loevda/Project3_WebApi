/**
 * Created by david2099 on 22/12/18.
 */
const SHA256 = require('crypto-js/sha256');
const bodyParser = require("body-parser");
const BlockChainClass = require('../models/BlockChain');
const Block = require('../models/Block');

class BlockChainController {
    constructor(app) {
        this.app = app;
        this.chain = new BlockChainClass();
        this.initExpressMiddleWare();
        this.getBlock();
        this.postBlock();
    }

    initExpressMiddleWare() {
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json());
    }

    getBlock() {
        this.app.get("/block/:index", async (req, res) => {
            // Add your code here
            try {
                let block = await this.chain.getBlock(req.params.index);
                res.json(block);
            } catch(err) {
                res.json({"error": err.toString()});
            }
        });
    }

    postBlock() {
        this.app.post("/block/", async (req, res) => {
            // Add your code here
            console.log(req.body);
            const block = new Block(req.body);
            try {
                let result = await this.chain.addBlock(block);
                res.json(result);
            } catch(err) {
                res.json({"error": err.toString()});
            }
        });
    }


}

module.exports = (app) => { return new BlockChainController(app);}