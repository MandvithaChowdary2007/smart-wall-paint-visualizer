const router = require('express').Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Color = require('../models/Color');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

router.get('/stats', auth, admin, async (req,res,next) => {
  try {
    const [users,projects,colors,products] = await Promise.all([
      User.countDocuments(), Project.countDocuments(), Color.countDocuments(), Product.countDocuments()
    ]);
    res.json({users,projects,colors,products});
  } catch(e) { next(e); }
});
module.exports = router;
