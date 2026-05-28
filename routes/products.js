const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const existing = await Product.find();
    if (existing.length > 0) {
      return res.json({ message: 'Already seeded', count: existing.length });
    }

    const products = [
      { name: 'Apple', price: 2.99, category: 'fruits', emoji: '🍎', description: 'Fresh red apples' },
      { name: 'Banana', price: 1.49, category: 'fruits', emoji: '🍌', description: 'Ripe yellow bananas' },
      { name: 'Orange', price: 3.49, category: 'fruits', emoji: '🍊', description: 'Juicy oranges' },
      { name: 'Strawberry', price: 4.99, category: 'fruits', emoji: '🍓', description: 'Fresh strawberries' },
      { name: 'Broccoli', price: 2.49, category: 'vegetables', emoji: '🥦', description: 'Fresh broccoli' },
      { name: 'Carrot', price: 1.99, category: 'vegetables', emoji: '🥕', description: 'Crunchy carrots' },
      { name: 'Tomato', price: 2.79, category: 'vegetables', emoji: '🍅', description: 'Ripe tomatoes' },
      { name: 'Potato', price: 1.29, category: 'vegetables', emoji: '🥔', description: 'Fresh potatoes' },
      { name: 'Milk', price: 3.99, category: 'dairy', emoji: '🥛', description: 'Fresh milk 1L' },
      { name: 'Cheese', price: 5.99, category: 'dairy', emoji: '🧀', description: 'Gouda cheese' },
      { name: 'Eggs', price: 4.49, category: 'dairy', emoji: '🥚', description: 'Dozen eggs' },
      { name: 'Yogurt', price: 2.99, category: 'dairy', emoji: '🥣', description: 'Greek yogurt' },
      { name: 'Bread', price: 2.99, category: 'bakery', emoji: '🍞', description: 'Whole wheat bread' },
      { name: 'Croissant', price: 1.99, category: 'bakery', emoji: '🥐', description: 'Butter croissant' },
      { name: 'Baguette', price: 3.49, category: 'bakery', emoji: '🥖', description: 'French baguette' },
      { name: 'Donut', price: 1.49, category: 'bakery', emoji: '🍩', description: 'Glazed donut' }
    ];

    const created = await Product.insertMany(products);
    res.status(201).json({ message: 'Seeded successfully', count: created.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
