const ImageModel = require('../models/photos');
exports.addPhotos = async (req, res) => {
    let images = req.files;
    let imageIds = "";
    if (images.length < 2) {
        return res.json({ error: "Must  provide atleast 2 images" });
    }
    else {

        // Make The New Product
        try {
            await req.files.map(async (image) => {
                try {
                    let newImage = new ImageModel({
                        contentType: image.mimetype,
                        image: image.buffer
                    });
                    await newImage.save(async (err, result) => {
                        if (err) res.send(err.message)
                        else {
                            imageIds += result._id + ",";
                            if (imageIds.split(',').length > images.length) {
                                console.log(imageIds.split(','))
                                res.json({ "Success": "Uploaded Files", "Files Object Id": imageIds })
                            }
                        }
                    });

                } catch (e) {
                    console.log(e.message)
                }
            })
            console.log("Success" + imageIds);

        } catch (e) {
            console.log(e)
        }
    }
}
exports.getPhotoById = (req, res) => {
    ImageModel.findById(req.params.id, (err, result) => {
        if (err) res.send(err.message)
        else {
            try {
                res.set('Content-Type', result.contentType)
                res.send(result.image)
            } catch (e) {
                res.send(e.message);
            }
        }
    })
}