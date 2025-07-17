import User from "../models/User.js";
import Order from "../models/Order.js";

export const getSummary = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const salesAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalSales = salesAgg[0]?.total || 0;
    res.json({ users, orders, totalSales });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error: error.message });
  }
};
