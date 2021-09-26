const multer = require('multer');

const type = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
};

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = type[file.mimetype];
      cb(null, Math.ceil(Math.random() * 100000) + '.' + ext);
    },
  }),

  fileFilter: (req, file, cb) => {
    const isValid = !!type[file.mimetype];
    const error = isValid ? null : new Error('Invalid Type');
    cb(error, isValid);
  },
});

module.exports = fileUpload;
