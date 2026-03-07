const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

router.get('/', async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newImage = new Gallery(req.body);
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (err) {
        res.status(400).json({ error: 'Bad request' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedImage = await Gallery.findByIdAndDelete(req.params.id);
        if (!deletedImage) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
