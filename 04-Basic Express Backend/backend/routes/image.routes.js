const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require("../models/image");

router.get("/", async (req, res) => {
    console.log("Find All Image");
    try {
      const result = await Image.find();
      res.json({ rows: result });
    } catch (error) {
      res.status(404).json({ err: error });
    }
}); 

router.get("/:id", async (req, res) => {
    console.log("Find All Image");
    try {
      const result = await Image.findById(req?.params?.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ err: error });
    }
});

router.post("/", async (req, res) => {
    console.log("Create Image Body", req.body);
    const newImage = new Image(req.body);
    try {
      await newImage.save({});
      res.status(201).json(newImage);
    } catch (error) {
      console.error("Error",error)
      res.status(400).json({ err: error });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    try {
        const updatedImage = await Image.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedImage) {
            return res.status(404).json({ error: "Image not found." });
        }
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ err: "Image not found." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ err: error });
    }
});

module.exports = router;
