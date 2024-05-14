const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require("../models/Product");
const Image = require("../models/image");

router.get("/", async (req, res) => {
  console.log("Find All Product");
  try {
    const result = await Product.find().populate("image");
    res.json({ rows: result });
  } catch (error) {
    res.status(404).json({ err: error });
  }
});

// router.get("/:id", async (req, res) => {
//   console.log("Find All Product");
//   try {
//     const result = await Product.findById(req?.params?.id);
//     res.json(result);
//   } catch (error) {
//     res.status(404).json({ err: error });
//   }
// });

// router.get("/:id", async (req, res) => {
//   console.log("Find Product by ID"); 
//   try {
//     const result = await Product.findById(req.params.id).populate("image");
//     res.json({ rows: [result] });
//   } catch (error) {
//     res.status(404).json({ err: error });
//   }
// });

router.get("/:id", async (req, res) => {
  console.log("Find Product by ID");
  try {
    const productId = req.params.id;
    const populateImage = req.query.populateImage === 'true';
    
    let result;
    if (populateImage) {
      result = await Product.findById(productId).populate("image");
    } else {
      result = await Product.findById(productId);
    }

    if (!result) {
      return res.status(404).json({ err: "Product not found" });
    }
    
    res.json(result);
  } catch (error) {
    res.status(404).json({ err: error.message });
  }
});


router.post("/", async (req, res) => {
  console.log("Create Product Body", req.body);

  try {
    const playload = req.body
    if (
      req.body.image
    ) {
      console.log(req.body);
      const newImage = new Image({ url: req.body.image });
      await newImage.save();
      playload.image = newImage._id
    }
    const newProduct = new Product(playload);
    await newProduct.save({});
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error", error)
    res.status(400).json({ err: error });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ error: "Invalid ID format" });
  // }
  try {
    if (
      req.body.image
    ) {
      try {
        const foundimage = await Image.findById(req.body.image)
        console.log(foundimage)
      } catch (error) {
        const newImage = new Image({ url: req.body.image });
        await newImage.save();
        updateData.image = newImage._id
      }

    }
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateData });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ err: "Product not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
