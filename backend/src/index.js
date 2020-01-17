const express = require ('express');
const moongoose = require ('mongoose');
const cors = require ('cors');

const routes = require ('./routes');
const mongoConfig = require('./services/mongoService');

const app = express ();

moongoose.connect (mongoConfig.uris, mongoConfig.options);

app.use(cors());
app.use (express.json ());
app.use (routes);

app.listen (3333);
