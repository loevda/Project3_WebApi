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
            const error = new Error('Not Found');
            error.status = 404;
            res.json({"error": error.message});
        });
    }

    catchErrors () {
        this.app.use((error, req, res, next) => {
            res.json({"error": error.message});
        });
    }

}

module.exports = (app) => { return new ErrorController(app);}