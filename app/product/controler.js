    const  connection =  require('../../config/mysql');
    const path = require('path');
    const fs = require('fs');
    
     
    /// melihat  atau menampilkam database pada product    
    
    const index =  (req, res) =>{
        const{search} = req.query;
        let exec = {};    
        if(search) {

            exec ={
                sql:'SELECT * FROM products WHERE name LIKE ?',
                values:[`%${search}%`]         
            }
        }
        else {
            exec = {
                sql:'SELECT * FROM products '
            }
        }
        connection.query( exec ,response(res));
    }
    
    
    
    //// Menampilkan id pada product 

    const view =  (req, res) =>{
        connection.query({
        sql:'SELECT * FROM products WHERE id = ?',
        values:[req.params.id]
        } ,response(res));
    }
    /// menghapus data pada database 
    
    const destroy =  (req, res) =>{
        connection.query({
        sql:'DELETE  FROM products WHERE id = ?',
        values:[req.params.id]
        } ,response(res));
    }

    //// mengirimkan isi 
    const store =  (req, res) =>{
        const { users_id , name , price , stok , status} = req.body;
        const image = req.file;

    if(image) {
    
    const target = path.join(__dirname , '../../uploads', image.originalname );
    fs.renameSync(image.path, target);
    connection.query({
        sql:'INSERT INTO products ( users_id,name , price , stok , status, image_url ) VALUES (?, ? , ? , ? ,?,?)',
        values:[ parseInt(users_id) , name , price , stok ,status,`http://localhost:3000/public/${image.originalname}`]
        } ,response(res));
    }
        
    }

    //melakukan update 

    const update =  (req, res) =>{
        const { users_id , name , price , stok , status} = req.body;
        const image = req.file;
        let sql ='';
        let values = [];
    if(image) {
    
        const target = path.join(__dirname , '../../uploads', image.originalname );
        fs.renameSync(image.path, target);    
        sql = 'UPDATE  products SET users_id = ? , name = ? , price = ?  , stok = ? , status = ? , image_url = ? WHERE id = ?' ;
        values = [ parseInt(users_id) , name , price , stok ,status,`http://localhost:3000/public/${image.originalname}` , req.params.id]
    
    }else{
        sql =  'UPDATE products SET users_id = ? , name = ? , price = ?  , stok = ? , status = ? ,  WHERE id = ?' ;
        values = [ parseInt(users_id) , name , price , stok ,status, req.params.id ]
    }
    connection.query({ sql , values} ,response(res));    
    }
        

    const  response = (res) =>{

    return(error, result ) => {

        if(error){
        res.send({
        status :'faild' ,
        response:error

        });
        } else {
            res.send({
            status :'succes ',
            response:result
            });
            }
        }
    }

    module.exports = {
        index , view , store , update , destroy }



        ////// const routes = require('express').Router();
// const multer = require('multer');
// const upload = multer({ dest: './uploads' });
// const productControl = require('../product/controler');


// routes.get('/product' , productControl.index);

// routes.get('/product/:id' , productControl.view);

// routes.post('/product/', upload.single('image'), productControl.store);

// routes.put('/product/:id' ,upload.single('image') ,productControl.update);

// routes.delete('/product/:id' ,upload.single('image') ,productControl.destroy);

// module.exports = routes;
