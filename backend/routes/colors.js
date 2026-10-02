const router = require('express').Router();
const Color = require('../models/Color');
const { auth, admin } = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    res.json(await Color.find(filter).sort({ createdAt: -1 }));
  } catch(e) { next(e); }
});

router.post('/', auth, admin, async (req,res,next) => {
  try { res.status(201).json(await Color.create(req.body)); } catch(e) { next(e); }
});
router.put('/:id', auth, admin, async (req,res,next) => {
  try { res.json(await Color.findByIdAndUpdate(req.params.id, req.body, {new:true})); } catch(e) { next(e); }
});
router.delete('/:id', auth, admin, async (req,res,next) => {
  try { await Color.findByIdAndDelete(req.params.id); res.json({message:'Deleted'}); } catch(e) { next(e); }
});
module.exports = router;
