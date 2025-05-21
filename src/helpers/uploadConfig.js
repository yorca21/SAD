const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedFiles/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, uniqueName);
    }
});

// Filtrar tipos de archivos permitidos (opcional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/; // Solo permitimos imágenes y PDFs
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'));
    }
};

// Límite de tamaño del archivo (opcional)
const limits = {
    fileSize: 2 * 1024 * 1024 // Limitar a 2MB
};

// Inicializamos Multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: limits 
});

module.exports = upload;
