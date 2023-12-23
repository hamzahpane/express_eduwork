const router= require('express').Router();
const proControler = require('./controler');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

router.get('/product' , proControler.index);
router.get('/product/:id' , proControler.view);
router.post('/product/:id', upload.single('image'), proControler.store);



module.exports = router ;





//  router.get('/product/:id' , productControl.view);

// router.post('/product/:id', upload.single('image'), productControl.store);























// const router = require('express').Router();
// const Product = require('./model');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const upload = multer({dest:'uploads'});



// router.post('/product', upload.single('image') ,async (req ,res ) =>{

//     const {user_id , name , price , stok , status } = req.body;
//     const image = req.file;

//     if(image){
//         const target = path.join(__dirname , '../../uploads', image.originalname );
//         fs.renameSync(image.path, target);    
//     try {
//         await Product.sync();
//         const result = await Product.create({user_id , name , price , stok , status , image_url:`http://localhost:3000/public/${image.originalname}`});
//         res.send(result);
//     } catch (e) {
//         res.send(e);
    
//         }
//     }   

//     });

// module.exports =  router ; 