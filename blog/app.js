const express = require('express');
const app = express();
let cors = require('cors');
require('./config/db');

// CORS
const corsOptions = {
    origin: '*',
    credentials: true
};

app.use(cors(corsOptions));

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("./", (req, res) => {
    res.render("index");
});

// Error
app.use((req, res, next) => {
    const erro = new Error("404 NOT FOUND");
    erro.status = 404;
    next(erro.msg);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            msg: error.message
        }
    })
});

module.exports = app;