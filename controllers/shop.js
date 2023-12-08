import * as Product  from "../models/products.js";


const getProducts=(req,res,next)=>{
    const allProducts =Product.Product.fetchAll();
    
    res.render('shop/product-list', {
      prods: allProducts,
      pageTitle: 'All Products',
      path: '/products',
    });
}

const getIndex=(req,res,next)=>{ 
  const allProducts =Product.Product.fetchAll();
  res.render('shop/index', {
    prods: allProducts,
    pageTitle: 'Shop',
    path: '/',
  });
}

const getCart=(req,res,next)=>{
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/',
  });
}


const getOrders=(req,res,next)=>{
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  });
}


const getcheckout=(req,res,next)=>{
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
}



export{getProducts,getIndex,getCart,getcheckout,getOrders}