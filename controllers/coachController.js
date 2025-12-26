const { Coach } = require('../models');
const { Op } = require('sequelize');

// Get all coaches
exports.getAllCoaches = async (req, res) => {
    try {
        const { search, specialization, isAvailable } = req.query;

        const whereClause = {};

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { specialization: { [Op.like]: `%${search}%` } }
            ];
        }

        if (specialization) whereClause.specialization = specialization;
        if (isAvailable !== undefined) whereClause.isAvailable = isAvailable === 'true';

        const coaches = await Coach.findAll({
            where: whereClause,
            order: [['rating', 'DESC']]
        });

        res.json({
            success: true,
            count: coaches.length,
            data: coaches
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching coaches',
            error: error.message
        });
    }
};

// Get coach by ID
exports.getCoachById = async (req, res) => {
    try {
        const coach = await Coach.findByPk(req.params.id);

        if (!coach) {
            return res.status(404).json({
                success: false,
                message: 'Coach not found'
            });
        }

        res.json({
            success: true,
            data: coach
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching coach',
            error: error.message
        });
    }
};

// Create coach
exports.createCoach = async (req, res) => {
    try {
        const coach = await Coach.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Coach created successfully',
            data: coach
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating coach',
            error: error.message
        });
    }
};

// Update coach
exports.updateCoach = async (req, res) => {
    try {
        const coach = await Coach.findByPk(req.params.id);

        if (!coach) {
            return res.status(404).json({
                success: false,
                message: 'Coach not found'
            });
        }

        await coach.update(req.body);

        res.json({
            success: true,
            message: 'Coach updated successfully',
            data: coach
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating coach',
            error: error.message
        });
    }
};

// Delete coach
exports.deleteCoach = async (req, res) => {
    try {
        const coach = await Coach.findByPk(req.params.id);

        if (!coach) {
            return res.status(404).json({
                success: false,
                message: 'Coach not found'
            });
        }

        await coach.destroy();

        res.json({
            success: true,
            message: 'Coach deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting coach',
            error: error.message
        });
    }
};
