const mongoose = require('mongoose');
require('dotenv').config({
  path: process.env.DOTENV || '.env'
})
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  // hash: {
  //   type: String,
  // },
  // salt: {
  //   type: String,
  // },
  activated: {
    type: Boolean,
    default: false
  },
  activeToken: String,
  activeExpires: Date,
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Use Mongoose createdAt & updatedAt,)
})

// UserSchema.methods.setPassword = (password) => {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UserSchema.methods.validatePassword = (password) => {
//   const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//   return this.hash === hash;
// };

// UserSchema.methods.generateJWT = () => {
//   return token = jwt.sign({
//     id: this._id
//   }, process.env.SECRET, {
//     expiresIn: 86400 // expires in 24 hours
//   });
// }

// UserSchema.methods.toAuthJSON = function () {
//   return {
//     _id: this._id,
//     email: this.email,
//     firstName: this.firstName,
//     lastName: this.lastName,
//     token: this.generateJWT(),
//   };
// };
const User = mongoose.model("User", UserSchema);
module.exports = User;