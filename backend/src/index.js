const express = require ("express");
const moongoose = require ("mongoose");
const routes = require ("./routes");

const app = express ();

moongoose.connect ("mongodb+srv://wilgnne:wilgnne@cluster0-fov9a.mongodb.net/week10?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use (express.json ());
app.use (routes);

app.listen (3333);
