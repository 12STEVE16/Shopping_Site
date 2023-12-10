import * as Product  from "../models/products.js";



const getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing:false
    });
}

const postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product.Product(title, imageUrl, description, price);

  product.save();
  res.redirect('/');
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;
  // Use the static method directly, no need for Product.Product
  const product = Product.Product.findById(prodId);
  if (!product) {
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product,
  });
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  // Fetch the existing product by ID
  const existingProduct = Product.Product.findById(productId);

  if (existingProduct) {
      // Update the existing product's properties
      existingProduct.title = updatedTitle;
      existingProduct.imageUrl = updatedImageUrl;
      existingProduct.price = updatedPrice;
      existingProduct.description = updatedDescription;

      // Save the updated product
      Product.Product.update(existingProduct);

      res.redirect('/products');
  } else {
      // Handle the case where the product is not found
      res.status(404).send('Product not found');
  }
};

const postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  // Delete the product by ID
  Product.Product.deleteById(productId);

  res.redirect('/products');
};


const getProducts=(req,res,next)=>{
    const allProducts =Product.Product.fetchAll();
    
    res.render('admin/products', {
      prods: allProducts,
      pageTitle: 'All Products list',
      path: '/admin/products',
    });
};





export{getAddProduct,postAddProduct,getProducts,getEditProduct,postEditProduct,postDeleteProduct
}