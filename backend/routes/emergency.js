const express = require('express');
const router = express.Router();
const EmergencyRequest = require('../models/EmergencyRequest');
const Ambulance = require('../models/Ambulance');

// Create emergency request (user)
router.post('/request', async (req, res) => {
  try {
    const { userId, lng, lat } = req.body;
    const reqDoc = await EmergencyRequest.create({
      userId,
      userLocation: { type: 'Point', coordinates: [lng, lat] }
    });
    // Very simple assignment: find nearest available ambulance
    const nearest = await Ambulance.findOne({ status: 'available', currentLocation: { $near: { $geometry: { type: 'Point', coordinates: [lng, lat] }, $maxDistance: 50000 } } });
    if (nearest) {
      reqDoc.ambulanceId = nearest._id;
      reqDoc.status = 'assigned';
      await reqDoc.save();
      nearest.status = 'busy';
      await nearest.save();
    }
    res.json(reqDoc);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// List requests
router.get('/all', async (req, res) => {
  try {
    const list = await EmergencyRequest.find().populate('ambulanceId userId');
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
