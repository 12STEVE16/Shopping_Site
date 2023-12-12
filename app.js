
// src/app.js
import express from 'express';
import mongoose from 'mongoose';

import * as shopRouter from './routes/shop.js';
import * as adminRouter from './routes/admin.js';
import * as errorController from './controllers/error.js';
import User from "./models/user.js";


const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

mongoose.connect("mongodb://0.0.0.0:27017/shoppingSite")
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'steve',
          email: 'stevesunny99@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(express.static('public'));


app.use('/admin', adminRouter.router);
app.use('/',shopRouter.router);


app.use(errorController.get404);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
