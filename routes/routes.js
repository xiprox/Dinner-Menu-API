var fs = require('fs');
var config = require("../config");

var appRouter = function (app) {
    app.get("/", function (req, res) {
        res.send("Nothing to see here.");
    });

    app.get("/get", function (req, res) {
        res.set("Content-Type", "application/json");

        if (!req.query.year || !req.query.month) {
            return res.send(
                {
                    "error": {
                        "status": "ERROR_MISSING_PARAM",
                        "message": "Missing year or month parameter."
                    }
                }
            )
        } else if (req.query.month <= 0 || req.query.month > 12) {
            return res.send(
                {
                    "error": {
                        "status": "ERROR_INVALID_MONTH",
                        "message": "Invalid month (should be 1-12)."
                    }
                }
            )
        } else {
            path = './data/menus/' + req.query.year + '_' + req.query.month + '.json';

            /* Read file and return contents */
            fs.readFile(path, 'utf8', function (err, data) {
                if (err) {
                    return res.send(
                        {
                            "month": parseInt(req.query.month),
                            "year": parseInt(req.query.year),
                            "days": []
                        }
                    );
                }

                return res.send(data);
            });
        }
    });

    app.post("/upload", function (req, res) {
        if (!req.body.username || !req.body.password || !req.body.month || !req.body.year || !req.body.menu) {
            return res.send(
                {
                    "error": {
                        "status": "ERROR_MISSING_PARAM",
                        "message": "Missing username, password, month, year, or menu parameter."
                    }
                }
            )
        } else if (req.body.username !== config.username || req.body.password !== config.password) {
            return res.send(
                {
                    "error": {
                        "status": "ERROR_AUTH",
                        "message": "Username or password invalid."
                    }
                }
            )
        } else if (req.query.month <= 0 || req.query.month > 12) {
            return res.send(
                {
                    "error": {
                        "status": "ERROR_INVALID_MONTH",
                        "message": "Invalid month (should be 1-12)."
                    }
                }
            )
        } else {
            path = './data/menus/' + req.body.year + '_' + req.body.month + '.json';

            fs.writeFile(
                path,
                JSON.stringify(
                    {
                        "month": parseInt(req.body.month),
                        "year": parseInt(req.body.year),
                        "menu": JSON.parse(req.body.menu)
                    }
                ),
                function (err) {
                    if (err) {
                        return res.send(
                            {
                                "error": {
                                    "status": "ERROR_SAVE",
                                    "message": "There was an error saving menu."
                                }
                            }
                        );
                    }

                    return res.send({"success": true})
                });
        }
    });
};

module.exports = appRouter;