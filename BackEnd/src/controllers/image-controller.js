const { S3 } = require('aws-sdk');
const multer = require('multer');

// Configuración de S3
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

class ImageController {
  // Configuración de Multer para manejar la carga de imágenes
  static storage = multer.memoryStorage();
  static upload = multer({ storage: ImageController.storage }).single('image'); // Middleware de Multer

  // Método para subir una imagen a S3
  uploadImage(req, res) {
    const file = req.file;

    if (!file) {
      return res.status(400).send('No se ha proporcionado un archivo.');
    }

    this.uploadImageToS3(file)
      .then((imageUrl) => {
        res.status(200).json({ imageUrl });
      })
      .catch((error) => {
        res.status(500).send('Error al subir la imagen.');
      });
  }

  // Método interno para manejar la subida a S3
  uploadImageToS3(file) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `images/${file.originalname}`, // El nombre del archivo en S3
      Body: file.buffer, // El contenido del archivo en memoria
      ContentType: file.mimetype, // El tipo MIME del archivo
    };

    return s3
      .upload(params)
      .promise() // Retorna la promesa de la subida
      .then((data) => {
        return data.Location; // Devuelve la URL de la imagen subida
      })
      .catch((error) => {
        console.error('Error al subir la imagen a S3:', error);
        throw error;
      });
  }

  // Método para obtener una imagen desde S3
  getImage(req, res) {
    const { key } = req.params;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    };

    s3.getObject(params)
      .createReadStream()
      .on('error', (err) => {
        res.status(404).send('Imagen no encontrada.');
      })
      .pipe(res);
  }
}

module.exports = new ImageController();
