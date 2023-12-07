
// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import * as shopRouter from './routes/shop.js';
import * as adminRouter from './routes/admin.js';


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://0.0.0.0:27017/userMangement");
app.use(express.static('public'));


app.use('/admin', adminRouter.router);
app.use('/',shopRouter.router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
