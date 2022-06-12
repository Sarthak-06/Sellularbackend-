const express = require("express");
const router = express.Router();
const photoController = require('../controller/photos');
const multer = require("multer");
const upload = multer({
    limits: { fileSize: 1000000, },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
})
router.get('/get-photo/:id', photoController.getPhotoById);
router.post('/add-photo', upload.array('images', 3), photoController.addPhotos);
module.exports = router;