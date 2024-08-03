const mongoose = require('mongoose');

// Define the Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date }
});

// Define the Docking Schema
const dockingSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  dockingTime: { type: Date, default: Date.now },
  dockedAt: { type: String, required: true },
  serviceVehicle: { type: Number, required: true },
  loadingStatus: { type: String, required: true },
});

// Define the Yard Schema
const yardSchema = new mongoose.Schema({
  dockings: [dockingSchema],
  vehicles: [vehicleSchema]
});

// Export the model
module.exports = mongoose.model('Yard', yardSchema);
