const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.get("/", async (req, res) => {
    console.log("Find All Orders");
    try {
      const result = await Order.find();
      res.json({ rows: result });
    } catch (error) {
      res.status(404).json({ err: error });
    }
  });
  
  router.get("/:id", async (req, res) => {
    console.log("Find All Orders");
    try {
      const result = await OrderOrder.findById(req?.params?.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ err: error });
    }
  });
  
router.post("/", async (req, res) => {
    console.log("Create Order Body", req.body);
    const newOrder = new Order(req.body);
    
    try {
      await newOrder.save({});
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ err: error });
    }
  });


  router.post("/", async (req, res) => {
    console.log("Create Order Body", req.body);
    const newOrder = new Order({
        ...req.body,
        customer_name: req.body.customer_name,
        tel: req.body.tel,
        address: req.body.address
    });
    
    try {
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ err: error });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found." });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ err: "Order not found." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ err: error });
    }
});

module.exports = router;