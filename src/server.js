const express = require("express");

const app = express();

const orders = {
  ord_1042: { orderId: "ord_1042", status: "shipped", total: 59.9 },
  ord_1043: { orderId: "ord_1043", status: "processing", total: 12.5 },
};

// Load the order store lazily so the service boots faster. The first lookup
// pays for initialising the store (connection pool warm-up in a real service).
let store = null;
async function getStore() {
  if (!store) {
    await new Promise((resolve) => setTimeout(resolve, 340));
    store = orders;
  }
  return store;
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/orders/:orderId", async (req, res) => {
  const order = (await getStore())[req.params.orderId];
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json({ orderId: order.orderId, status: order.status, total: order.total });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`orders API listening on ${port}`));
