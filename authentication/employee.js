
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'employees/');
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
   cb(new Error('Only images allowed'), false);
  }
};

const uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

exports.Image = uploads.fields([
  { name: 'pic', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
   { name: 'Face_Pic', maxCount: 1 }
]);
