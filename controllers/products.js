import * as Product  from "../models/products.js";

const getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
}
const postAddProduct=(req,res,next)=>{
     const product = new Product.Product(req.body.title);
     product.save();
    res.redirect('/');
};
const getProducts=(req,res,next)=>{
    const allProducts =Product.Product.fetchAll();
    
    res.render('shop', {
      prods: allProducts,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: allProducts.length > 0,
      activeShop: true,
      productCSS: true
    });
}


export{getAddProduct,postAddProduct,getProducts}