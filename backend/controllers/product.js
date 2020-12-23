const { Types } = require('mongoose');
const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const Product = require('../models/product');
const helpers = require('../shared/helpers');

const { STORAGE_DOWNLOAD_TOKEN, STORAGE_LINK } = process.env;
const bucket = admin.storage().bucket();

exports.create = async (req, res) => {
  const { name, price } = req.body;
  const { userId } = req.user;
  const product = {
    name,
    price,
    owner: Types.ObjectId(userId),
    date: helpers.formatDate(new Date()),
  };

  if (!req.files) {
    await Product(product).save();
    return res.status(200).json({ message: 'Product created successfuly' });
  }

  const { image } = req.files;
  const path = uuid() + image.name;
  product.image = path;
  await helpers.bucketUpload(image, path);
  await Product(product).save();
  return res.status(200).json({ message: 'Product created successfuly' });
};

exports.read = async (req, res) => {
  const { userId } = req.user;
  const { page, collections, pages, skip } = await helpers.paginator(
    req.query.page,
    Product,
    { owner: Types.ObjectId(userId) },
  );
  const products = await Product
    .find({ owner: Types.ObjectId(userId) })
    // .sort({ $natural: -1 })
    .skip(skip).limit(10)
    .lean();
  products.map((product) => {
    if (product.image) {
      product.image = `${STORAGE_LINK}${product.image}?alt=media&token=${STORAGE_DOWNLOAD_TOKEN}`;
    }
    return product;
  });
  res.status(200).json({
    page,
    collections,
    pages,
    skip,
    products,
  });
};

exports.readById = async (req, res) => {
  const product = await helpers.getProduct(req);
  if (product.image) {
    product.image = product.image = `${STORAGE_LINK}${product.image}?alt=media&token=${STORAGE_DOWNLOAD_TOKEN}`;
  }
  res.status(200).json({ product });
};

exports.update = async (req, res) => {
  const { name, price } = req.body;
  const product = await helpers.getProduct(req);
  product.name = name;
  product.price = price;

  if (req.files && product.image) {
    const { image } = req.files;
    const path = uuid() + image.name;
    await bucket.file(product.image).delete();
    await helpers.bucketUpload(image, path);
    product.image = path;
  }
  await product.save();
  res.status(200).json({ message: 'Product is updated' });
};

exports.delete = async (req, res) => {
  const product = await helpers.getProduct(req);
  if (product.image) {
    await bucket.file(product.image).delete();
  }
  await product.remove();
  res.status(200).json({ message: 'Product is removed' });
};

exports.createTestItem = async (req, res) => {
  const products = await Product.find();
  const { userId } = req.user;
  const arr = [];
  for (let i = 0; i < 50; i++) {
    arr.push({
      name: `Test item ${i}`,
      price: 500,
      image: '9abb7711-e190-433b-b928-1a9a810c218577de807f-8978-4950-bc30-d59df1c3caae.jpg',
      owner: userId,
    });
  }
  await Product.insertMany(arr);
  for (let i = 0; i < 50; i++) {
    Product(products[0]).save();
  }
  res.status(200).json({ message: 'Products is duplicated' });
};
