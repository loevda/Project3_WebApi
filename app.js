//Importing Express.js module
const express = require("express");
//Importing BodyParser.js module
const bodyParser = require("body-parser");

/**
 * Class Definition for the REST API
 */
class APIServer {

    /**
     * Constructor that allows initialize the class
     */
    constructor() {
        this.app = express();
        this.initExpress();
        this.initExpressMiddleWare();
        this.getInfo();
        this.initControllers();
        this.start();
    }

    /**
     * Initilization of the Express framework
     */
    initExpress() {
        this.app.set("port", 8000);
    }

    /**
     * Initialization of the middleware modules
     */
    initExpressMiddleWare() {
        this.app.use(bodyParser.urlencoded({extended:true}));
        this.app.use(bodyParser.json());
    }

    /**
     * Default route
     */
    getInfo() {
        this.app.get("/", (req, res) => {
            res.json({
                endpoints: [
                    {
                        "/block/[blockheight]": {
                            method: "GET",
                            param: "{number} blockheight",
                            description: "Return the block with height of {number} blockheight"
                        }
                    },
                    {
                        "/block": {
                            method: "POST",
                            description: "Add a new block to the blockchain .",
                            payload: "Takes either an url-encoded key/value pair (body=value) or a json object {'body': 'value'}."
                        }
                    }
                ]
            })
        });
    }

    /**
     * Initilization of all the controllers
     */
    initControllers() {
        require("./controllers/BlockChainController.js")(this.app);
        require("./controllers/ErrorController.js")(this.app);
    }

    /**
     * Starting the REST Api application
     */
    start() {
        let self = this;
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server Listening for port: ${self.app.get("port")}`);
        });
    }

}

new APIServer();