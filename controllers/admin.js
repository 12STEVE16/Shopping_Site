import Product from "../models/products.js";

const getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

const postAddProduct = async (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;

  try {
    // Create a new product using the Mongoose model
    const currentUser = req.user;
    const product = new Product({
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
      userId: '6576b0d78e25ad6282a2ac1b'
    });

    // Save the product to the database
    await product.save();

    res.redirect('/');
  } catch (error) {
    // Handle errors
    console.error('Error saving product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  try {
    // Use Mongoose findById method to retrieve the product by ID
    const product = await Product.findById(prodId);

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const postEditProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  try {
    // Use Mongoose findById method to retrieve the product by ID
    const existingProduct = await Product.findById(productId);

    if (existingProduct) {
      // Update the existing product's properties
      existingProduct.title = updatedTitle;
      existingProduct.imageUrl = updatedImageUrl;
      existingProduct.price = updatedPrice;
      existingProduct.description = updatedDescription;

      // Save the updated product
      await existingProduct.save();

      res.redirect('/products');
    } else {
      // Handle the case where the product is not found
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const postDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;

  try {
    // Use Mongoose findByIdAndDelete method to delete the product by ID
    await Product.findByIdAndDelete(productId);

    res.redirect('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getProducts = async (req, res, next) => {
  try {
    // Use Mongoose find method to retrieve all products
    const allProducts = await Product.find();

    res.render('admin/products', {
      prods: allProducts,
      pageTitle: 'All Products list',
      path: '/admin/products',
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
};

export {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
};
