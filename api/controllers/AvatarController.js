const uploadImage = require('../functions/uploadImage');
const Avatar = require('../models/AvatarModel')
const AWS = require('aws-sdk')

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

class AvatarController {
    static async saveAvatar(req, res) {
        const { img_url } = req.body;
        try {
            let uploaded = null;
            if (img_url) {
                uploaded = await uploadImage(img_url, 'schoob-avatars');
            }

            const avatar = await Avatar.create({
                img_url: uploaded ? `https://schoob-avatars.s3.sa-east-1.amazonaws.com/${uploaded}.jpeg` : null,
                img_name: uploaded ? `${uploaded}.jpeg` : null,
            });

            res.status(201).send(avatar);
        } catch (error) {
            return res.send(error)
        }
    }

    static async deleteAvatar(req, res) {
        const { avatarid } = req.params;

        try {
            const avatar = await Avatar.findById(avatarid)
            if (avatar) {
                if (avatar.img_name !== null) {
                    const s3 = new AWS.S3({
                        accessKeyId: AWS_ACCESS_KEY_ID,
                        secretAccessKey: AWS_SECRET_ACCESS_KEY,
                    });

                    s3.deleteObject({
                        Bucket: 'schoob-avatars',
                        Key: avatar.img_name
                    }, function (err, data) { })
                }

                await Avatar.findByIdAndDelete(avatarid);
            }

            res.status(200).json({ message: 'Avatar deleted successfully' });
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async allAvatars(req, res){
        try {
            const avatars = await Avatar.find()
            return res.json(avatars)
        } catch (error) {
            return res.status(500).send({message: "Erro ao buscar os avatares"})
        }
    }
}

module.exports = AvatarController;
