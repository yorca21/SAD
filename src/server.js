const express = require('express')
const { hola } = require('./modules/user/user.controller')

class ExpressServer {
    constructor() {
        this.port = 3000
        this.app = express()
        this.routes()
    }

    routes() {
        this.app.use('/user', require('./modules/user/user.router'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = ExpressServer