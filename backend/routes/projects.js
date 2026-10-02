const router = require('express').Router();
const Project = require('../models/Project');
const { auth } = require('../middleware/auth');

router.get('/', auth, async (req,res,next) => {
  try { res.json(await Project.find({user:req.user.id}).sort({updatedAt:-1})); } catch(e) { next(e); }
});

router.post('/', auth, async (req,res,next) => {
  try { res.status(201).json(await Project.create({...req.body, user:req.user.id})); } catch(e) { next(e); }
});

router.put('/:id', auth, async (req,res,next) => {
  try {
    const project = await Project.findOneAndUpdate(
      {_id:req.params.id,user:req.user.id}, req.body, {new:true}
    );
    if (!project) return res.status(404).json({message:'Project not found'});
    res.json(project);
  } catch(e) { next(e); }
});

router.delete('/:id', auth, async (req,res,next) => {
  try { await Project.deleteOne({_id:req.params.id,user:req.user.id}); res.json({message:'Deleted'}); } catch(e) { next(e); }
});
module.exports = router;
