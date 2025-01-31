const cloudinary = require('../utils/cloudinary');

exports.uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
            quality: 'auto',
            format: 'jpg',
        });

        res.status(200).json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
};