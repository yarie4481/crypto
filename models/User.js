const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
 
  name: { type: String, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  transfer: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },
  receive: { type: Number, default: 0 },
  send: { type: Number, default: 0 },

});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare hashed password with entered password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
