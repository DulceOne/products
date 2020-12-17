const Product = require('../models/product');
const user = require('../models/user');
const { Types } = require('mongoose');

exports.create = async (req, res) => {
    const { name, price } = req.body;
    const { user_id } = req.user;
    console.log(user_id)
    await Product({
            name,
            price,
            owner: Types.ObjectId(user_id),
            dete: new Date() // TODO need using moment js or move to helpers and conver in a valid value
    }).save()
    res.status(200).json({ message: 'Product created successfuly' })
}

exports.read = (req, res) => {
    
}

exports.readById = (req, res) => {
    
}

exports.update = (req, res) => {
    
}

exports.delete = (req, res) => {
    
}