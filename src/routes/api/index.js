module.exports = function routes(app) {
    app.use("/requests", require("./request.js"));
    app.use("/admin", require("./admin.js"));
    app.use("/payments", require("./payment.js"));
    app.use("/visuals", require("./visuals.js"));

    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
        error: {
            status: error.status || 500,
            message: error.message,
        },
        });
    });
  };


  