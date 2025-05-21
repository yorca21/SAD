const express = require('express')
const { initDB }= require('./config/db/mongo')
const cookieParser = require('cookie-parser');
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
        const corsOptions = {
            origin: 'http://localhost:5173', // URL del frontend
            credentials: true // Permite el envío de credenciales
        };
        
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // Para datos codificados en URL
        this.app.use(cookieParser()); 
        this.app.use(express.static('public'));
    }
    routes() {
        
        this.app.use('/auth', require('./modules/auth/authRouters'));
        this.app.use('/user', require('./modules/user/user.router'));
        this.app.use('/person', require('./modules/person/person.router'));
        this.app.use('/role', require('./modules/role/role.route'));
        this.app.use('/permission', require('./modules/permission/permission.router'));
        this.app.use('/unit', require('./modules/unit/unit.router'));
        this.app.use('/newdebt', require('./ManagementModels/newdebt/register.router'));
        this.app.use('/debt', require('./ManagementModels/debt/debt.router'))
        this.app.use('/activityhistory', require('./ManagementModels/activityhistory/activity.router'));
        this.app.use('/report', require('./ManagementModels/report/report.router'));
        this.app.use('/preview', require('./ManagementModels/preview/preview.router'));
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