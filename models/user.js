// models/products.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: { type: Number, required: true }
        }
      ]
    }
  });
  
  userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
  
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
  };
  
  userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
  };
  
  userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
  };

const User = mongoose.model('User', userSchema);

export default User;




















// import fs from 'fs';

// const productsFilePath = 'products.json';

// class Product {
//     constructor(title, imageUrl, description, price, id = null) {
//         this.id = id || Math.random().toString();
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         const existingProducts = Product.fetchAll();
//         const productIndex = existingProducts.findIndex(prod => prod.id === this.id);

//         if (productIndex !== -1) {
//             existingProducts[productIndex] = this;
//         } else {
//             existingProducts.push(this);
//         }

//         fs.writeFileSync(productsFilePath, JSON.stringify(existingProducts));
//     }

//     static update(updatedProduct) {
//         const products = Product.fetchAll();
//         const productIndex = products.findIndex(prod => prod.id === updatedProduct.id);

//         if (productIndex !== -1) {
//             products[productIndex] = updatedProduct;
//             fs.writeFileSync(productsFilePath, JSON.stringify(products));
//         }
//     }

//     static fetchAll() {
//         try {
//             const productsData = fs.readFileSync(productsFilePath);
//             const products = JSON.parse(productsData);
//             return products;
//         } catch (error) {
//             return [];
//         }
//     }

//     static findById(id) {
//         const products = Product.fetchAll();
//         const product = products.find(prod => prod.id === id);
//         return product ? new Product(product.title, product.imageUrl, product.description, product.price, product.id) : null;
//     }
    
//     static deleteById(id) {
//         let products = Product.fetchAll();
//         const updatedProducts = products.filter(prod => prod.id !== id);
//         fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts));
//     }
// }
// export { Product };
