// const products = [];
// class Product {
//     constructor(title, imageUrl, description, price) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         products.push(this);
//     }

//     static fetchAll() {
//         return products;
//     }
// }
  
//   export {Product} ;
  
import fs from 'fs';

const productsFilePath = 'products.json';

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        // Fetch existing products from the file
        const existingProducts = Product.fetchAll();

        // Add the current product to the existing products array
        existingProducts.push(this);

        // Write the updated array back to the file
        fs.writeFileSync(productsFilePath, JSON.stringify(existingProducts));
    }

    static fetchAll() {
        try {
            // Read products from the file
            const productsData = fs.readFileSync(productsFilePath);
            // Parse JSON data
            const products = JSON.parse(productsData);
            return products;
        } catch (error) {
            // If there's an error reading the file or parsing JSON, return an empty array
            return [];
        }
    }
}

export { Product };
