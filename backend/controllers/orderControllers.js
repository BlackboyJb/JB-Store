import AsyncHandler from "../middlewear/asyncHandler.js";
import Order from "../models/orderModels.js";

//desc    Create Order Items
//@routes POST /api/order
//@acess  Private

const addOrderItems = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log("This is orderitems" + JSON.stringify(orderItems, null, 2));
  console.log("This is shippingAddress" +JSON.stringify(shippingAddress, null, 2));
  console.log("This is paymentMethod" + JSON.stringify(paymentMethod, null, 2));
  console.log("This is itemsPrice" +JSON.stringify(itemsPrice, null, 2));
  console.log("This is taxPrice" + JSON.stringify(taxPrice, null, 2));
  console.log("This is shippingPrice" + JSON.stringify(shippingPrice, null, 2));
  console.log("This is Total Price" + JSON.stringify(totalPrice, null, 2));


  // if (orderItems && orderItems.length === 0) {
  //   res.status(400);
  //   throw new Error("No Order Items");
  // } else {
  //   const order = new Order({
  //     user: req.user._id,
  //     orderItems: orderItems.map((x) => ({
  //       ...x,
  //       products: x._id,
  //       _id: undefined,
  //     })),
  //     shippingAddress,
  //     paymentMethod,
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     taxPrice,
  //     totalPrice,
  //   });
  //   const createdOrder = await order.save();
  //   res.status(201).json(createdOrder);
  // }
});

//desc   Get logged in User Orders
//@route  GET /api/order/myOrders
//@access Private

const getMyOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//desc   Get Order By ID
//@route  GET /api/order/:id
//@access Private

const getOrderById = AsyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    "user",
    "fullName email"
  );

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

//desc    Update order to paid
//@route  UPDATE /api/order/:id/pay
//@access Private

const updateOrdersToPaid = AsyncHandler(async (req, res) => {
  res.send("Update Orders to Paid");
});

//desc    Update order to Delivered
//@route  UPDATE /api/order/:id/deliver
//@access Private/Admin

const updateOrdersToDelivered = AsyncHandler(async (req, res) => {
  res.send("Update Orders to Paid");
});

//desc    Get all orders
//@route  GET /api/order
//@access Private/Admin

const getOrders = AsyncHandler(async (req, res) => {
  res.send("Get all Orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrdersToPaid,
  updateOrdersToDelivered,
  getOrders,
};
