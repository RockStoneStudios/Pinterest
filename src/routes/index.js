const {Router} = require('express');

const router = Router();
const {unlink} = require('fs-extra');
const path = require('path');
const image = require('../models/image');

const Imagen = require('../models/image');

router.get('/', async(req,res)=>{
   const images = await Imagen.find();
   res.render('index',{images});

});

router.get('/upload',(req,res)=>{
    res.render('upload');
});

router.post('/upload', async(req,res)=>{
    const image = new Imagen();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/'+req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    await image.save();
    console.log(image);
    res.redirect('/');
});

router.get('/image/:id', async(req,res)=>{
   const img = await Imagen.findById(req.params.id);
   res.render('profile',{image:img});
});

router.get('/image/:id/delete', async(req,res)=>{
    const img = await Imagen.findByIdAndDelete(req.params.id);
     await unlink(path.resolve('./src/public'+img.path));
     res.redirect('/');
})

module.exports = router;