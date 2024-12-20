import asyncHandler from "../middlewear/asyncHandler.js";
import Order from "../models/orderModels.js";
import Product from "../models/productModels.js";
import { calcPrices } from "../utils/calcPrices.js";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal.js";

//desc    Create Order Items
//@routes POST /api/order
//@acess  Private

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        products: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.selectedCity,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.selectedCountry,
      },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//desc   Get logged in User Orders
//@route  GET /api/order/myOrders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//desc   Get Order By ID
//@route  GET /api/order/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
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

const updateOrdersToPaid = asyncHandler(async (req, res) => {
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//desc    Update order to Delivered
//@route  PUT /api/order/:id/deliver
//@access Private/Admin

const updateOrdersToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
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

const getOrders = asyncHandler(async (req, res) => {
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



















































// const {
//   orderItems,
//   shippingAddress,
//   paymentMethod,
// } = req.body;

// if (orderItems && orderItems.length === 0) {
//   res.status(400);
//   throw new Error("No Order Items");
// } else {
//   // NOTE: here we must assume that the prices from our client are incorrect.
//   // We must only trust the price of the item as it exists in
//   // our DB. This prevents a user paying whatever they want by hacking our client
//   // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

//   // get the ordered items from our database
//   const itemsFromDB = await Product.find({
//     _id: { $in: orderItems.map((x) => x._id) },
//   });

//   // map over the order items and use the price from our items from database
//   const dbOrderItems = orderItems.map((itemFromClient) => {
//     const matchingItemFromDB = itemsFromDB.find(
//       (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
//     );
//     return {
//       ...itemFromClient,
//       product: itemFromClient._id,
//       price: matchingItemFromDB.price,
//       _id: undefined,
//     };
//   });

//   // calculate prices
//   const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
//     calcPrices(dbOrderItems);

// }

// const order = new Order({
//   user: req.user._id,
//   orderItems: orderItems.map((x) => ({
//     name: x.name,
//     qty: x.qty,
//     image: x.image,
//     price: x.price,
//     products: x._id,
//     _id: undefined,
//   })),
//   shippingAddress: {
//     address: shippingAddress.address,
//     city: shippingAddress.selectedCity,
//     postalCode: shippingAddress.postalCode,
//     country: shippingAddress.selectedCountry,
//   },
//   paymentMethod,
//   itemsPrice: Number(itemsPrice),
//   shippingPrice: Number(shippingPrice),
//   taxPrice: Number(taxPrice),
//   totalPrice: Number(totalPrice),
// });
// const createdOrder = await order.save();
// res.status(201).json(createdOrder);






///Update order to paid former code
// const order = await Order.findById(req.params.id);

// if (order) {
//   order.isPaid = true;
//   order.paidAt = Date.now();
//   order.paymentResult = {
//     id: req.body.id,
//     status: req.body.status,
//     update_time: req.body.update_time,
//     email_address: req.body.email_address,
//   };
//   const updatedOrder = await order.save();
//   res.status(200).json(updatedOrder);
// } else {
//   res.staus(404);
//   throw new Error("Order Not Found");
// }
