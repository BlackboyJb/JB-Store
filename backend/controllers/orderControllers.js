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

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((x) => ({
        name: x.name,
        qty: x.qty,
        image: x.image,
        price: x.price,
        products: x._id,
        _id: undefined,
      })),
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.selectedCity,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.selectedCountry,
      },
      paymentMethod,
      itemsPrice: Number(itemsPrice),
      shippingPrice: Number(shippingPrice),
      taxPrice: Number(taxPrice),
      totalPrice: Number(totalPrice),
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
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
//@route  PUT /api/order/:id/pay
//@access Private

const updateOrdersToPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.staus(404);
    throw new Error("Order Not Found");
  }
});

//desc    Update order to Delivered
//@route  PUT /api/order/:id/deliver
//@access Private/Admin

const updateOrdersToDelivered = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered= true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.staus(404);
    throw new Error("Order Not Found");
  }
});

//desc    Get all orders
//@route  GET /api/order
//@access Private/Admin

const getOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id, fullName");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrdersToPaid,
  updateOrdersToDelivered,
  getOrders,
};
