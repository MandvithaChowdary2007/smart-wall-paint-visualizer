const router = require('express').Router();
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

router.get('/', async (req,res,next) => {
  try { res.json(await Product.find().sort({createdAt:-1})); } catch(e) { next(e); }
});
router.post('/', auth, admin, async (req,res,next) => {
  try { res.status(201).json(await Product.create(req.body)); } catch(e) { next(e); }
});
router.put('/:id', auth, admin, async (req,res,next) => {
  try { res.json(await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})); } catch(e) { next(e); }
});
router.delete('/:id', auth, admin, async (req,res,next) => {
  try { await Product.findByIdAndDelete(req.params.id); res.json({message:'Deleted'}); } catch(e) { next(e); }
});
module.exports = router;
