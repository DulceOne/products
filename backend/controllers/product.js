const { Types } = require('mongoose');
const admin = require('firebase-admin');
const uuid = require('uuid-v4');
const Product = require('../models/product');
const helpers = require('../shared/helpers');
const { STORAGE_DOWNLOAD_TOKEN, STORAGE_LINK } = process.env;
const bucket = admin.storage().bucket();
// const firestore = admin.firestore;

exports.create = async (req, res) => {
  const { name, price } = req.body;
  const { userId } = req.user;

  const product = {
    name,
    price,
    owner: Types.ObjectId(userId),
    dete: new Date(), // TODO need using moment js or move to helpers and conver in a valid value
  };

  if (!req.files) {
    await Product(product).save();
    return res.status(200).json({ message: 'Product created successfuly' });
  }

  const { image } = req.files;
  const path = uuid() + image.name;
  product.image = `${STORAGE_LINK}${path}?alt=media&token=${STORAGE_DOWNLOAD_TOKEN}`;

  await bucket.upload(image.tempFilePath, {
    destination: path,
    metadata: {
      contentType: image.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: STORAGE_DOWNLOAD_TOKEN,
      },
    },
  });
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
  const products = await Product.find().sort({ $natural: -1 }).skip(skip).limit(10);
  res.status(200).json({
    page,
    collections,
    pages,
    skip,
    products,
  });
};

exports.readById = async (req, res) => {
  const { userId } = req.user;
  const product = await Product.findOne({ owner: Types.ObjectId(userId) });
  res.status(200).json({ product });
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};