const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenBlackListSchema = new Schema({
  token: String,
  expireDate: Date
});

const TokenBlackList = mongoose.model("TokenBlackList", TokenBlackListSchema);
module.exports = TokenBlackList;