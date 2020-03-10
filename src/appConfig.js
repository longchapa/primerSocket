/** Dependencies */
const app = require("express")();
const bodyParser = require("body-parser");
const morgan = require('morgan');

/** Settings */
app.set("PORT", process.env.PORT);
app.set("HOST", process.env.HOST);

/** Middlewares */
app.use(bodyParser.json());
app.use(morgan("combined"));

/** Routes */
app.use('integrations/facebook', require('./routes/facebookMessenger'));

module.exports = app;
