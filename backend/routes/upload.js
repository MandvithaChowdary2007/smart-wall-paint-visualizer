const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');

const dir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});

const storage = multer.diskStorage({
  destination: dir,
  filename: (req,file,cb) => cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname).toLowerCase()}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req,file,cb) => {
    if (['image/jpeg','image/png'].includes(file.mimetype)) cb(null,true);
    else cb(new Error('Only JPG and PNG images are allowed'));
  }
});

router.post('/', auth, upload.single('image'), (req,res) => {
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});
module.exports = router;
