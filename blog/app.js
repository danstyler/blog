const express = require('express');
const routes = require('./routes');
let cors = require('cors');
const app = express();

// CORS
const corsOptions = {
    origin: '*',
    credentials: true
};

app.use(cors(corsOptions));

// Parser
app.use(express.urlenconded({ extended: true}));
app.use(express.json());

// Rotas
app.use(routes);


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