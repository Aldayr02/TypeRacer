const multer = require('multer');
const multers3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

// Configuración del cliente S3
const s3 = new S3Client({
    region: process.env._REGION,
    credentials: {
        accessKeyId: process.env._AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env._AWS_SECRET,
        sessionToken: process.env._AWS_SESSION_TOKEN
    },
    endpoint: `https://s3.${process.env._REGION}.amazonaws.com`, // Configura el endpoint basado en la región del bucket
    forcePathStyle: false // Opcional: Usar URLs de estilo virtual-hosted
});

// Configuración del almacenamiento con multer y S3
const s3Storage = multers3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: (req, file, cb) => {
        cb(null, { ...file });
    },
    key: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Middleware para la carga de archivos
const upload = multer({
    storage: s3Storage
});

module.exports = {upload};

