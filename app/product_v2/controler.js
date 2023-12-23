const connection = require('../../config/squlize');
const  Product = require('../product_v2/model');
const { QueryTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

// menampilkan keseluruhan pada db produks
const index = async (req, res) => {
    try {
        const products = await connection.query('SELECT * FROM products', {
            type: QueryTypes.SELECT,
        });

        response(res, null, products);
    } catch (error) {
        response(res, error, null);
    }
};

// menampilkan id keselurahan pada db produks
const view = async (req, res) => {
    try {
        const productId = req.params.id;
        const products = await connection.query('SELECT * FROM products WHERE id = ?', {
            type: QueryTypes.SELECT,
            replacements: [productId],
        });

        response(res, null, products);
    } catch (error) {
        response(res, error, null);
    }
};

const store = async (req ,res ) =>{

    const {user_id , name , price , stok , status } = req.body;
    const image = req.file;

    if(image){
        const target = path.join(__dirname , '../../uploads', image.originalname );
        fs.renameSync(image.path, target);    
    try {
        await Product.sync();
        const result = await Product.create({user_id , name , price , stok , status , image_url:`http://localhost:3000/public/${image.originalname}`});
        res.send(result);
    } catch (e) {
        res.send(e);
    
        }
    }   

    };




const response = (res, error, result) => {
    if (error) {
        res.send({
            status: 'failed',
            response: error,
        });
    } else {
        res.send({
            status: 'success',
            response: result,
        });
    }
};

module.exports = { index , view ,store};
