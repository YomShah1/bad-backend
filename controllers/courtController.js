const { Court, Booking } = require('../models');
const { Op } = require('sequelize');

// Get all courts
exports.getAllCourts = async (req, res) => {
    try {
        const { status, courtType } = req.query;

        const whereClause = {};
        if (status) whereClause.status = status;
        if (courtType) whereClause.courtType = courtType;

        const courts = await Court.findAll({
            where: whereClause,
            order: [['name', 'ASC']]
        });

        res.json({
            success: true,
            count: courts.length,
            data: courts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courts',
            error: error.message
        });
    }
};

// Get court by ID
exports.getCourtById = async (req, res) => {
    try {
        const court = await Court.findByPk(req.params.id, {
            include: [{ model: Booking }]
        });

        if (!court) {
            return res.status(404).json({
                success: false,
                message: 'Court not found'
            });
        }

        res.json({
            success: true,
            data: court
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching court',
            error: error.message
        });
    }
};

// Create court
exports.createCourt = async (req, res) => {
    try {
        const court = await Court.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Court created successfully',
            data: court
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating court',
            error: error.message
        });
    }
};

// Update court
exports.updateCourt = async (req, res) => {
    try {
        const court = await Court.findByPk(req.params.id);

        if (!court) {
            return res.status(404).json({
                success: false,
                message: 'Court not found'
            });
        }

        await court.update(req.body);

        res.json({
            success: true,
            message: 'Court updated successfully',
            data: court
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating court',
            error: error.message
        });
    }
};

// Delete court
exports.deleteCourt = async (req, res) => {
    try {
        const court = await Court.findByPk(req.params.id);

        if (!court) {
            return res.status(404).json({
                success: false,
                message: 'Court not found'
            });
        }

        await court.destroy();

        res.json({
            success: true,
            message: 'Court deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting court',
            error: error.message
        });
    }
};

// Check court availability
exports.checkAvailability = async (req, res) => {
    try {
        const { courtId } = req.params;
        const { date, startTime, endTime } = req.query;

        if (!date || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: 'Date, start time, and end time are required'
            });
        }

        const bookings = await Booking.findAll({
            where: {
                courtId,
                bookingDate: date,
                status: { [Op.in]: ['pending', 'confirmed'] },
                [Op.or]: [
                    {
                        startTime: { [Op.between]: [startTime, endTime] }
                    },
                    {
                        endTime: { [Op.between]: [startTime, endTime] }
                    },
                    {
                        [Op.and]: [
                            { startTime: { [Op.lte]: startTime } },
                            { endTime: { [Op.gte]: endTime } }
                        ]
                    }
                ]
            }
        });

        const isAvailable = bookings.length === 0;

        res.json({
            success: true,
            available: isAvailable,
            message: isAvailable ? 'Court is available' : 'Court is already booked for this time slot',
            conflictingBookings: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking availability',
            error: error.message
        });
    }
};

// Book a court
exports.bookCourt = async (req, res) => {
    try {
        const { courtId } = req.params;
        const { playerId, bookingDate, startTime, endTime, notes } = req.body;

        // Check if court exists
        const court = await Court.findByPk(courtId);
        if (!court) {
            return res.status(404).json({
                success: false,
                message: 'Court not found'
            });
        }

        // Check availability
        const existingBookings = await Booking.findAll({
            where: {
                courtId,
                bookingDate,
                status: { [Op.in]: ['pending', 'confirmed'] },
                [Op.or]: [
                    { startTime: { [Op.between]: [startTime, endTime] } },
                    { endTime: { [Op.between]: [startTime, endTime] } },
                    {
                        [Op.and]: [
                            { startTime: { [Op.lte]: startTime } },
                            { endTime: { [Op.gte]: endTime } }
                        ]
                    }
                ]
            }
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Court is not available for the selected time slot'
            });
        }

        // Calculate total amount
        const startHour = parseInt(startTime.split(':')[0]);
        const endHour = parseInt(endTime.split(':')[0]);
        const hours = endHour - startHour;
        const totalAmount = court.pricePerHour * hours;

        // Create booking
        const booking = await Booking.create({
            courtId,
            playerId,
            bookingDate,
            startTime,
            endTime,
            totalAmount,
            notes,
            status: 'confirmed'
        });

        res.status(201).json({
            success: true,
            message: 'Court booked successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error booking court',
            error: error.message
        });
    }
};
