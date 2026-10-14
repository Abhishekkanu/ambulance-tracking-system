const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available','busy'], default: 'available' },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] }
  }
}, { timestamps: true });

AmbulanceSchema.index({ currentLocation: "2dsphere" });

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
