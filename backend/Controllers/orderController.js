import asyncHandler from 'express-async-handler'; //to avoid try catch
import Order from '../Models/orderModel.js';

//@desc Create new order
//POST /api/orders
//Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //orderItems empty hony pr...
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // A new empty object is created.
    const order = new Order({
      orderItems,
      user: req.user._id, //logged in user ko attach kr rahy is order k sath
      shippingAddress,
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

//@desc Get order by ID
//GET /api/orders/:id
//Private
const getOrderById = asyncHandler(async (req, res) => {
  //populate() lets you reference documents in other collections
  //User ka name or email b chaiye jo is order k sath associated hy is leye populate use kr rahy
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  //agr id k mutabiq order exist krta hy
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc Update order to paid
//GET /api/orders/:id/pay
//Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //User ka name or email b chaiye jo is order k sath associated hy is leye populate use kr rahy
  const order = await Order.findById(req.params.id);
  //agr id k mutabiq order exist krta hy
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      //comming from Paypal
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc Get logged in user orders
//GET /api/orders/myorders
//Private
const getMyOrders = asyncHandler(async (req, res) => {
  //aik sy zaida orders chaiyein is leye find use kea
  //loggedIn user ka orders milein gay
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
