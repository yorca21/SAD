const express = require('express')
const { initDB }= require('./config/db/mongo')
const cors = require('cors');

class ExpressServer {
    constructor() {
        this.port = 3000
        this.app = express()
        this.middlewares()
        this.routes()
        this.initmongoDB()
    }
    middlewares(){
        
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes() {
        
        this.app.use('/auth', require('./modules/auth/authRouters'));
        this.app.use('/user', require('./modules/user/user.router'));
        this.app.use('/person', require('./modules/person/person.router'));
        this.app.use('/role', require('./modules/role/role.route'));
        this.app.use('/permission', require('./modules/permission/permission.router'));
        this.app.use('/unit', require('./modules/unit/unit.router'));
    }
    async initmongoDB(){
        await initDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`The connection port is: ${this.port}`)
        })
    }
}

module.exports = ExpressServer