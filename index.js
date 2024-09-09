require('dotenv').config();

const ExpressServer = require("./src/server");

const servidor = new ExpressServer()
servidor.listen()