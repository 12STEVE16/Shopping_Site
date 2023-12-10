import fs from 'fs';
import path from 'path';

const cartFilePath = path.join(
  process.cwd(),
  'data',
  'cart.json'
);

class Cart {
  static addProduct(id, productPrice) {
    console.log("hello2");

    // Fetch the previous cart
    fs.readFile(cartFilePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      // Write the cart to the file
      fs.mkdir(path.dirname(cartFilePath), { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile(cartFilePath, JSON.stringify(cart), { flag: 'w' }, (err) => {
            if (err) {
              // Handle the error (e.g., log it)
              console.error(err);
            } else {
              console.log('Cart updated successfully!');
            }
          });
        }
      });
    });
  }
  static getCart() {
    const cartContent = fs.readFileSync(cartFilePath, 'utf-8');
    return JSON.parse(cartContent);
  }
  static deleteProduct(id) {
    fs.readFile(cartFilePath, (err, fileContent) => {
      if (err) {
        console.error(err);
        return;
      }

      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(prod => prod.id === id);

      if (!product) {
        return;
      }

      if (product.qty > 1) {
        // If quantity is more than 1, decrement the quantity
        product.qty--;
      } else {
        // If quantity is 1 or less, remove the product from the cart
        updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      }

      updatedCart.totalPrice -= product.price;

      fs.writeFile(cartFilePath, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Product removed from cart successfully!');
        }
      });
    });
  }
}

export { Cart };


