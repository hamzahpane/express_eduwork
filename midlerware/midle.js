const midle = ( req ,res , next) =>{

    console.log( new Date().toLocaleTimeString(), '=>' ,req.method ,req.originalUrl);
    next();    
}

module.exports = midle;