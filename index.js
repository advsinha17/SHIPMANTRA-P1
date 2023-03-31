const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Order = require("./models/orders");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

dbUrl = "mongodb://127.0.0.1:27017/assgn";

DUMMY_ORDERS = [
  {
    senderName: "Chuck",
    senderCoordinates: [185, 101],
    recepientName: "Terry",
    recieverCoordinates: [252, 96],
    packages: [
      {
        length: 2,
        breadth: 1,
        height: 3,
        weight: 5,
        items: [
          {
            itemName: "book",
            quantity: 2,
          },
          {
            itemName: "bookmark",
            quantity: 1,
          },
        ],
      },
      {
        length: 6,
        breadth: 3,
        height: 5,
        weight: 10,
        items: [
          {
            itemName: "whiteboard",
            quantity: 3,
          },
          {
            itemName: "marker",
            quantity: 10,
          },
        ],
      },
    ],
    trips: [
      {
        shipperName: "Mack",
        startCoordinates: [185, 101],
        endCoordinates: [191, 58],
        status: "Delivered",
      },
      {
        shipperName: "Lewis",
        startCoordinates: [191, 58],
        endCoordinates: [252, 96],
        status: "Out for delivery",
      },
    ],
  },
  {
    senderName: "John",
    senderCoordinates: [289, 191],
    recepientName: "Harry",
    recieverCoordinates: [105, 200],
    packages: [
      {
        length: 3,
        breadth: 4,
        height: 3,
        weight: 10,
        items: [
          {
            itemName: "clipboard",
            quantity: 5,
          },
        ],
      },
      {
        length: 20,
        breadth: 20,
        height: 13,
        weight: 40,
        items: [
          {
            itemName: "blackboard",
            quantity: 10,
          },
        ],
      },
    ],
    trips: [
      {
        shipperName: "George",
        startCoordinates: [289, 191],
        endCoordinates: [105, 200],
        status: "In transit",
      },
    ],
  },
];

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  await Order.deleteMany({});
  for (DUMMY_ORDER of DUMMY_ORDERS) {
    const order = new Order(DUMMY_ORDER);
    await order.save();
  }
  res.redirect("/order");
});

app.get("/order", (req, res) => {
  res.render("order");
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find({});
  res.render("orders", { orders });
});

app.get("/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("trips");
  res.render("show", { order });
});

app.listen(3000, () => {
  console.log("listening on port 3000...");
});
