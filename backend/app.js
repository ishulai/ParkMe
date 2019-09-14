const routes = require("./routes");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

const cors = require('cors');
const state = require("./classes/state");

const interval = require("./interval")();

const currentState = new state();
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app, currentState);

interval.tick(currentState);

app.listen(port, () => console.log(`Simulation starting on ${port}!`))
