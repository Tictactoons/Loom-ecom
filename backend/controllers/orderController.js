import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5177";

  try {
    // ✅ use req.userId from middleware
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("=== ORDER DEBUG ===");
    console.log("User ID:", req.userId);
    console.log("Items:", req.body.items);
    console.log("Amount:", req.body.amount);
    console.log("=== ORDER ERROR ===");
    console.log(error);
    console.log("==================");

    res.json({ success: false, message: error.message });
  }
};

  const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
      if (success == "true") {
          await orderModel.findByIdAndUpdate(orderId,{payment:true});
          res.json({success:true,message:"paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId);
          res.json({success:false,message:"Not Paid"})
      }
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
  }

  // user orders for frontend
  const userOrders = async (req,res) => {
    try {
      const orders = await orderModel.find({userId:req.userId});
      res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
  }

  // Listing orders for admin panel

  const listOrders = async (req,res) => {
    try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
    }
  }

  // api for updating order status
  // Update order status
const updateStatus = async (req, res) => {
  try {
    console.log("Updating order status:", req.body);
    
    const { orderId, status } = req.body;
    
    if (!orderId || !status) {
      return res.json({ success: false, message: "Missing orderId or status" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("Status update error:", error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
