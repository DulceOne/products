const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = process.env.SECRET;

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await User({ username, password: passwordHash.generate(password), email }).save();
    return res.status(200).json({ message: 'User created successfully' });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(403).json({
        error: 'User already exists',
      });
    }
    return res.send(e);
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User is not defined' });
  }

  const verify = passwordHash.verify(password, user.password);
  if (!verify) {
    return res.sendStatus(401);
  }

  const token = jwt.sign({ user_id: user._id }, secret);
  return res.send({ token });
};
