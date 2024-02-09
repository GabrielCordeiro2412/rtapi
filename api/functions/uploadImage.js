const AWS = require('aws-sdk');
const { Buffer } = require('buffer');
const { v4: uuidv4 } = require('uuid');

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = process.env;

function uploadImage(img_url, bucket) {
    return new Promise((resolve, reject) => {
        const s3Bucket = new AWS.S3({ params: { Bucket: bucket } });
        const buf = Buffer.from(img_url.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const imageName = uuidv4();

        const data = {
            Key: `${imageName}.jpeg`,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
            ACL: 'public-read',
        };

        AWS.config.update({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region: 'sa-east-1'
        });

        s3Bucket.putObject(data, function (err, data) {
            if (err) {
                console.error(err);
                console.error('Erro ao fazer o upload da imagem: ', data);
                reject(null);
            } else {
                console.log('Sucesso ao fazer o upload!');
                console.log(imageName);
                resolve(imageName);
            }
        });
    });
}

module.exports = uploadImage;
