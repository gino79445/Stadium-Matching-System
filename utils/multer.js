const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where the uploaded files will be stored
        cb(null, process.env.UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        // Set the filename of the uploaded file
        const randomName = crypto.randomBytes(8).toString('hex');
        req.fileName = Date.now() + '-' + randomName + '-' + file.originalname;
        cb(null, req.fileName);
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
};
