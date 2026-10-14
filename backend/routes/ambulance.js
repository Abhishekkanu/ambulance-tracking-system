const express = require('express');
const router = express.Router();
const Ambulance = require('../models/Ambulance');

// Add ambulance (admin)
router.post('/add', async (req, res) => {
  try {
    const { vehicleNumber, driverId } = req.body;
    const a = await Ambulance.create({ vehicleNumber, driverId });
    res.json(a);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// List all ambulances
router.get('/all', async (req, res) => {
  try {
    const list = await Ambulance.find().populate('driverId', 'name email');
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
