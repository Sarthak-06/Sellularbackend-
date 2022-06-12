const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    contentType: { type: String, required: true },
    image: { type: Buffer, required: true }
})
const Images = new mongoose.model('Images', imageSchema);
module.exports = Images;