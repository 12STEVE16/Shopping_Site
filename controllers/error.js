import express from 'express';
import bodyParser from 'body-parser';
const router = express();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.set('view engine', 'ejs');
router.set('views', './views');


const get404=(req,res,next)=>{
    res.status(404).render('404',{pageTitle:"Page Not Found",path:"/404"});
}


 export  {get404}