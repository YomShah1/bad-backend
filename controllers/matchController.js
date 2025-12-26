const { Match, Player, Court, Tournament } = require('../models');
const { Op } = require('sequelize');

// Get all matches
exports.getAllMatches = async (req, res) => {
    try {
        const { status, matchType, tournamentId } = req.query;

        const whereClause = {};
        if (status) whereClause.status = status;
        if (matchType) whereClause.matchType = matchType;
        if (tournamentId) whereClause.tournamentId = tournamentId;

        const matches = await Match.findAll({
            where: whereClause,
            include: [
                { model: Player, as: 'player1', attributes: ['id', 'name', 'playerId'] },
                { model: Player, as: 'player2', attributes: ['id', 'name', 'playerId'] },
                { model: Court, attributes: ['id', 'name', 'courtType'] },
                { model: Tournament, attributes: ['id', 'name'] }
            ],
            order: [['matchDate', 'DESC']]
        });

        res.json({
            success: true,
            count: matches.length,
            data: matches
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching matches',
            error: error.message
        });
    }
};

// Get single match
exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id, {
            include: [
                { model: Player, as: 'player1' },
                { model: Player, as: 'player2' },
                { model: Court },
                { model: Tournament }
            ]
        });

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.json({
            success: true,
            data: match
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching match',
            error: error.message
        });
    }
};

// Create new match
exports.createMatch = async (req, res) => {
    try {
        const match = await Match.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Match created successfully',
            data: match
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating match',
            error: error.message
        });
    }
};

// Update match
exports.updateMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        await match.update(req.body);

        res.json({
            success: true,
            message: 'Match updated successfully',
            data: match
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating match',
            error: error.message
        });
    }
};

// Delete match
exports.deleteMatch = async (req, res) => {
    try {
        const match = await Match.findByPk(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        await match.destroy();

        res.json({
            success: true,
            message: 'Match deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting match',
            error: error.message
        });
    }
};
