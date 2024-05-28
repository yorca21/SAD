const express = require('express')
const { initDB }= require('./config/db/mongo')

class ExpressServer {
    constructor() {
        this.port = 3000
        this.app = express()
        this.routes()
        this.initmongoDB()
    }
    async initmongoDB(){
        await initDB();
    }
    routes() {
        this.app.use('/user', require('./modules/user/user.router'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El puerto de coneccion es: ${this.port}`)
        })
    }
}

module.exports = ExpressServer