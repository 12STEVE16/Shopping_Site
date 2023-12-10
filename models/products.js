// models/products.js

import fs from 'fs';

const productsFilePath = 'products.json';

class Product {
    constructor(title, imageUrl, description, price, id = null) {
        this.id = id || Math.random().toString();
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const existingProducts = Product.fetchAll();
        const productIndex = existingProducts.findIndex(prod => prod.id === this.id);

        if (productIndex !== -1) {
            existingProducts[productIndex] = this;
        } else {
            existingProducts.push(this);
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(existingProducts));
    }

    static update(updatedProduct) {
        const products = Product.fetchAll();
        const productIndex = products.findIndex(prod => prod.id === updatedProduct.id);

        if (productIndex !== -1) {
            products[productIndex] = updatedProduct;
            fs.writeFileSync(productsFilePath, JSON.stringify(products));
        }
    }

    static fetchAll() {
        try {
            const productsData = fs.readFileSync(productsFilePath);
            const products = JSON.parse(productsData);
            return products;
        } catch (error) {
            return [];
        }
    }

    static findById(id) {
        const products = Product.fetchAll();
        const product = products.find(prod => prod.id === id);
        return product ? new Product(product.title, product.imageUrl, product.description, product.price, product.id) : null;
    }
    
    static deleteById(id) {
        let products = Product.fetchAll();
        const updatedProducts = products.filter(prod => prod.id !== id);
        fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts));
    }
}
export { Product };
