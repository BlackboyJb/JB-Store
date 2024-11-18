import asyncHandler from "../middlewear/asyncHandler.js";
import Product from "../models/productModels.js";

const getProduct = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNo);
  const keywords = req.query.keywords
    ? { name: { $regex: req.query.keywords, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keywords });

  const products = await Product.find({ ...keywords })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (products) {
    return res.json(products);
  } else {
    res.status(404);
  }
});


//@desc       CREATE PRODUCT
//@route      CREATE/api/products/:id
//@access      Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const products = new Product({
    name: "sample Product",
    price: 0,
    user: req.user._id,
    image: "../image/sample.jpg",
    brand: "sample Brand",
    category: "sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await products.save();
  res.status(201).json(createdProduct);
});

//@desc       UPDATE PRODUCT
//@route      DELETE /api/products/:id
//@access      Private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("No Resource Found");
  }
});

//@desc       DELETE PRODUCT
//@route      DELETE /api/products/:id
//@access      Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("No Resource Found");
  }
});

//@desc       CREATE A NEW REVIEW
//@route      POST /api/products/:id/reviews
//@access      Private
const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviwed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviwed) {
      res.status(400);
      throw new Error("Product is already Reviewed");
    }

    const review = {
      name: req.user.fullName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

//@desc       GET TOP RATED PRODUCT
//@route      GET /api/products/top
//@access      Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({rating : -1}).limit(4);
  res.status(200).json(products)

});

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReviews,
  getTopProducts
};
