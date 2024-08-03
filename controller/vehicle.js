const Vehicle = require('../model/schema');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');


exports.checkIn = async (req, res) => {
  try {
    const { vehicleNumber, driverName } = req.body;
    const qrCodePath = path.join(__dirname, `../qr-codes/${vehicleNumber}.png`);
    await QRCode.toFile(qrCodePath, vehicleNumber);
    const vehicle = new Vehicle({ vehicleNumber, driverName });
    await vehicle.save();
    res.status(201).json({ message: 'Vehicle checked in', vehicle });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    const vehicle = await Vehicle.findOneAndUpdate(
      { vehicleNumber },
      { checkOutTime: Date.now() },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle checked out', vehicle });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
