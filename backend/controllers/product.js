const { Types } = require('mongoose');
const Product = require('../models/product');

exports.create = async (req, res) => {
  const { name, price } = req.body;
  const { userId } = req.user;
  await Product({
    name,
    price,
    owner: Types.ObjectId(userId),
    dete: new Date(), // TODO need using moment js or move to helpers and conver in a valid value
  }).save();
  res.status(200).json({ message: 'Product created successfuly' });
};

exports.read = (req, res) => {

};

exports.readById = (req, res) => {

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};