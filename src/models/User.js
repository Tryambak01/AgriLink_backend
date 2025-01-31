const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["farmer", "warehouse_staff"],
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      wallet_address: {
        type: String,
        unique: true,
        sparse: true, // Allows null values while keeping uniqueness
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true } // Adds createdAt & updatedAt fields
);

//used to handle hashing of password before uploading to db
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
//used in "/login" to verify user entered password.
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
module.exports = mongoose.model("User", UserSchema);