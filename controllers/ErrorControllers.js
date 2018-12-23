/**
 * Created by david2099 on 23/12/18.
 */


class ErrorController {

    constructor(app) {
        this.app = app;
        this.notFound();
        this.catchErrors();
    }

    notFound () {
        this.app.use((req, res) => {
            const err = new Error('Not Found');
            err.status = 404;
            res.json(JSON.stringify(err.toString()));
        });
    }

    catchErrors () {
        this.app.use((error, req, res, next) => {
            res.json({"Error": error.message});
        });
    }

}

module.exports = (app) => { return new ErrorController(app);}