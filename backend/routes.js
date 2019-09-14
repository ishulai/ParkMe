const routes = (app, state) => {
    const events = require("./events")(state);

    app.post("/login", (req, res) => events.login(req.body, res, state));
    app.post("/vote", (req, res) => events.vote(req.body, res, state));
    app.post("/getstate", (req, res) => events.getstate(req.body, res, state));
}

module.exports = routes;