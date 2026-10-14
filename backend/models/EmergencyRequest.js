const mongoose = require('mongoose');

const EmergencyRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ambulanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' },
  status: { type: String, enum: ['requested','assigned','enroute','arrived','completed'], default: 'requested' },
  userLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

EmergencyRequestSchema.index({ userLocation: "2dsphere" });

module.exports = mongoose.model('EmergencyRequest', EmergencyRequestSchema);
