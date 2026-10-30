const express = require("express");

const app = express();

const orders = {
  ord_1042: { orderId: "ord_1042", status: "shipped", total: 59.9, discountCode: "SPRING10" },
  ord_1043: { orderId: "ord_1043", status: "processing", total: 12.5 },
};

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/orders/:orderId", (req, res) => {
  const order = orders[req.params.orderId];
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const body = { orderId: order.orderId, status: order.status, total: order.total };
  if (order.discountCode) {
    body.discountCode = order.discountCode;
  }
  res.json(body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`orders API listening on ${port}`));
