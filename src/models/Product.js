const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String, // Example: "50 kg", "2 tons"
      required: true,
    },
    price: {
      type: Number, // Example: price per unit in smallest currency (e.g., lamports)
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt fields automatically
);

module.exports = mongoose.model("Product", ProductSchema);
