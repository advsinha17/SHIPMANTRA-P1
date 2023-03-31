const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderCoordinates: {
    type: [Number],
    required: true,
  },
  recepientName: {
    type: String,
    required: true,
  },
  recieverCoordinates: {
    type: [Number],
    required: true,
  },
  packages: [
    {
      length: {
        type: Number,
        required: true,
      },
      breadth: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      items: [
        {
          itemName: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
  trips: [
    {
      shipperName: {
        type: String,
        required: true,
      },
      startCoordinates: {
        type: [Number],
        required: true,
      },
      endCoordinates: {
        type: [Number],
        required: true,
      },
      status: {
        type: String,
        enum: [
          "Not Started",
          "Out for Pickup",
          "In transit",
          "Out for delivery",
          "Delivered",
        ],
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
