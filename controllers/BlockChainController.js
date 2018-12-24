/**
 * Created by david2099 on 22/12/18.
 */
const { body, validationResult } = require('express-validator/check');
const SHA256 = require('crypto-js/sha256');
const BlockChainClass = require('../models/BlockChain');
const Block = require('../models/Block');

class BlockChainController {
    constructor(app) {
        this.app = app;
        this.chain = new BlockChainClass();
        this.getBlock();
        this.postBlock();
    }

    getBlock() {
        this.app.get("/block/:blockheight", async (req, res) => {
            try {
                let block = await this.chain.getBlock(req.params.blockheight);
                res.json(block);
            } catch(err) {
                res.json({"error": err.toString()});
            }
        });
    }

    postBlock() {
        this.app.post("/block/", [
            // value must exist
            body('body', 'Missing payload {body}.').exists(),
            // value must be an email
            body('body', 'Payload {body} must be a string.').isString(),
            // value must be at least 3 chars long
            body('body', 'Payload {body} key must be at least 3 characters long.').isLength({ min: 3 })
        ], async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            } else {
                try {
                    const block = new Block(req.body.body);
                    let result = await this.chain.addBlock(block);
                    res.json(JSON.parse(result));
                } catch(err) {
                    res.json({"error": err.toString()});
                }
            }
        });
    }
}

module.exports = (app) => { return new BlockChainController(app);}