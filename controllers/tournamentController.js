const { Tournament, Match } = require('../models');

// Get all tournaments
exports.getAllTournaments = async (req, res) => {
    try {
        const { status } = req.query;

        const whereClause = {};
        if (status) whereClause.status = status;

        const tournaments = await Tournament.findAll({
            where: whereClause,
            include: [
                { model: Match, attributes: ['id', 'matchType', 'status'] }
            ],
            order: [['startDate', 'DESC']]
        });

        res.json({
            success: true,
            count: tournaments.length,
            data: tournaments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tournaments',
            error: error.message
        });
    }
};

// Get single tournament
exports.getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findByPk(req.params.id, {
            include: [{ model: Match }]
        });

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Tournament not found'
            });
        }

        res.json({
            success: true,
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tournament',
            error: error.message
        });
    }
};

// Create tournament
exports.createTournament = async (req, res) => {
    try {
        const tournament = await Tournament.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Tournament created successfully',
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating tournament',
            error: error.message
        });
    }
};

// Update tournament
exports.updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByPk(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Tournament not found'
            });
        }

        await tournament.update(req.body);

        res.json({
            success: true,
            message: 'Tournament updated successfully',
            data: tournament
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating tournament',
            error: error.message
        });
    }
};

// Delete tournament
exports.deleteTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByPk(req.params.id);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Tournament not found'
            });
        }

        await tournament.destroy();

        res.json({
            success: true,
            message: 'Tournament deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting tournament',
            error: error.message
        });
    }
};
