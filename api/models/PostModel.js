const mongoose = require('../database/index')
const { Schema } = require('../database/index');


const postSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    instituicao:{
        type: Schema.Types.ObjectId,
        ref: 'Instituicao',
        require: true,
    },
    turma:{
        type: Schema.Types.ObjectId,
        ref: 'Turma',
        require: false,
    },
    img_url:{
        type: String,
        required: false
    },
    img_name:{
        type: String,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;