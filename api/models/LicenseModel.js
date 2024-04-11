const mongoose = require('../database/index');
const { Schema } = require('../database/index');

const LicenseSchema = new mongoose.Schema({
    instituicao: {
        type: Schema.Types.ObjectId,
        ref: 'Instituicao'
    },
    licenseKey: { 
        type: String,
        unique: true,
        require: true,
    },
    expirationDate: { 
        type: Date,
        select: false
    },
    status: { 
        type: Boolean, 
        default: false
    }

}, {
    timestamps: true
})

const License = mongoose.model('License', LicenseSchema);

module.exports = License;