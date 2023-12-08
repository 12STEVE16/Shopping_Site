
// src/app.js
import express from 'express';
import mongoose from 'mongoose';

import * as shopRouter from './routes/shop.js';
import * as adminRouter from './routes/admin.js';
import * as errorController from './controllers/error.js';



const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', './views');


mongoose.connect("mongodb://0.0.0.0:27017/userMangement");
app.use(express.static('public'));


app.use('/admin', adminRouter.router);
app.use('/',shopRouter.router);


app.use(errorController.get404);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
