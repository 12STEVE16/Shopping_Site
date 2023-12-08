import * as Product  from "../models/products.js";



const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
    });
}
// const postAddProduct=(req,res,next)=>{
//      const product = new Product.Product(req.body.title);
     
//      product.save();
//      res.redirect('/');
// };

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product.Product(title, imageUrl, description, price);

  product.save();
  res.redirect('/');
};


const getProducts=(req,res,next)=>{
    const allProducts =Product.Product.fetchAll();
    
    res.render('admin/products', {
      prods: allProducts,
      pageTitle: 'All Products list',
      path: '/admin/products',
    });
};





export{getAddProduct,postAddProduct,getProducts}