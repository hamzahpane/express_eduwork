const express = require('express');
const path = require('path');
const  log = require('morgan');
const cors = require('cors');
const  productV2 = require('./app/product_v2/routes');
// const ProductRout = require('./app/product/routes');
const app = express();

app.use(cors());
app.use(log('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.text());
app.use('/public' , express.static(path.join(__dirname,'uploads')));
app.use('/api/v2', productV2);

app.use((req, res) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000/api/v2/product'));


