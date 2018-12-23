/**
 * Created by david2099 on 23/12/18.
 */


class ErrorController {

    constructor(app) {
        this.app = app;
        this.notFound();
    }

    notFound () {
        this.app.use((req, res) => {
            res.json({"error": "Not Found"});
        })
    }


}

module.exports = (app) => { return new ErrorController(app);}