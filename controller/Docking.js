const Yard = require('../model/schema'); // Adjust the path as necessary

exports.dockingarea = async (req, res) => {
    try {
      const { yardId, vehicleNumber, driverName, dockingTime, dockedAt, serviceVehicle, loadingStatus } = req.body;

      // Find the Yard document by its ID
      const yard = await Yard.findById(yardId);
      if (!yard) {
        return res.status(404).json({ message: 'Yard not found' });
      }

      // Create a new Docking object
      const newDocking = {
        vehicleNumber,
        driverName,
        dockingTime,
        dockedAt,
        serviceVehicle,
        loadingStatus
      };

      // Push the new Docking object into the dockings array
      yard.dockings.push(newDocking);

      // Save the updated Yard document
      await yard.save();
      res.status(201).json({ message: 'Docking entry added to Yard', yard });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};
