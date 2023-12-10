import * as Product  from "../models/products.js";
import * as Cart  from "../models/cart.js";

const getProducts=(req,res,next)=>{
    const allProducts =Product.Product.fetchAll();
    res.render('shop/product-list', {
      prods: allProducts,
      pageTitle: 'All Products',
      path: '/products',
    });
}

const getProduct=(req,res,next)=>{
  const prodID =req.params.productId;
  const product=Product.Product.findById(prodID);
  res.render('shop/product-detail', {
    product: product,
    pageTitle:product.title,
    path: '/products'
})};



const getIndex=(req,res,next)=>{ 
  const allProducts =Product.Product.fetchAll();
  res.render('shop/index', {
    prods: allProducts,
    pageTitle: 'Shop',
    path: '/',
  });
}

const getCart = (req, res, next) => {
  // Fetch the cart details
  const cart = Cart.Cart.getCart();

  // Fetch product details for each item in the cart
  const cartProducts = cart.products.map(cartProduct => {
    const product = Product.Product.findById(cartProduct.id);
    return {
      productData: product,
      qty: cartProduct.qty
    };
  });

  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: cartProducts
  });
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;

  // Fetch the product details
  const product = Product.Product.findById(prodId);

  // Add the product to the cart
  Cart.Cart.addProduct(prodId, product.price);

  // Redirect to the cart page
  res.redirect('/cart');
};

const postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;

  // Delete the product from the cart
  Cart.Cart.deleteProduct(productId);

  // Redirect back to the cart page
  res.redirect('/cart');
};

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



export{getProducts,getIndex,getcheckout,getOrders,getProduct,getCart,postCart,postCartDeleteItem}