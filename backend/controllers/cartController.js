import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {}; // ensure cartData exists

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log("Add to cart error:", error.message);
    res.json({ success: false, message: "Error", error: error.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) delete cartData[itemId]; // optional: clean up
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log("Remove from cart error:", error.message);
    res.json({ success: false, message: "Error", error: error.message });
  }
};

// Get user cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Get cart error:", error.message);
    res.json({ success: false, message: "Error", error: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
