const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new mongoose.Schema({
recipient:{ 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
}, // Usuario que recibe la notificación
message:{ 
    type: Schema.Types.String, 
    required: true 
}, // Contenido de la notificación
read:{ 
    type: Schema.Types.Boolean, 
    default: false 
}, // Si la notificación fue leída o no
timestamp:{ 
    type: Schema.Types.Date, 
    default: Date.now 
},// Fecha de la notificación
link: {
    type: Schema.Types.String 
} // Enlace a la entidad relacionada (documento, acción, etc.)
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
