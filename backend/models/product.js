const mongoose = require('mongoose');

const { Schema, Types, model } = mongoose;

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required field'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required field'],
  },
  date: {
    type: String,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  views: Number,
});

module.exports = model('Product', ProductSchema);
