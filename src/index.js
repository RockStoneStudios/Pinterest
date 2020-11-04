const express = require('express');

const app = express();
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid').v4;
const {format} = require('timeago.js')

require('./database');

//Settings
 app.set('port',process.env.PORT||3000);
 app.set('views',path.join(__dirname,'views'));
 app.set('view engine','ejs');


//Middlewares

app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    app.locals.format = format;
    next();
})

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/img/uploads'),
    filename: (req,file,cb,filename) =>{
        cb(null, uuid()+path.extname(file.originalname));
    }
});
app.use(multer({storage:storage}).single('image'));

app.use(require('./routes/index'))
//Global Variables

//Routes

//Static Files

//Start Server

app.listen(app.get('port'),()=>{
     console.log('Iniciando puerto '+app.get('port')+' ....');
});