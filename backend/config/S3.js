const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'my-bucket',
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },

        key: (req, file, cb) => {
            cb(null, `uploads/${Date.now().toString()}-${file.originalname}`);
        },
    }),
});

module.exports = upload;