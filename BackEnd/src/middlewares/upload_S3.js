const multer = require('multer');
const multers3  = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env._AWS_SESSION_TOKEN
    },
    endpoint: `https://s3.${process.env._REGION}.amazonaws.com`, // Set the correct endpoint based on your bucket's region
	forcePathStyle: false, // Optional: Use the virtual-hosted–style URLs
});

const s3Storage = multers3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: (req, file, cb) => {
        cb(null, { ...file });
    },
    key: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: s3Storage
})

module.exports = upload;