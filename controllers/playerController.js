const { Player, Match } = require('../models');
const { Op } = require('sequelize');

// Get all players with rankings
exports.getAllPlayers = async (req, res) => {
    try {
        const { search } = req.query;

        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { playerId: { [Op.like]: `%${search}%` } }
            ];
        }

        const players = await Player.findAll({
            where: whereClause,
            order: [['ranking', 'ASC']]
        });

        res.json({
            success: true,
            count: players.length,
            data: players
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching players',
            error: error.message
        });
    }
};

// Get player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id, {
            include: [
                { model: Match, as: 'matchesAsPlayer1' },
                { model: Match, as: 'matchesAsPlayer2' }
            ]
        });

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        res.json({
            success: true,
            data: player
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching player',
            error: error.message
        });
    }
};

// Create player
exports.createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Player created successfully',
            data: player
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating player',
            error: error.message
        });
    }
};

// Update player
exports.updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        await player.update(req.body);

        // Recalculate win rate if matches data changed
        if (req.body.totalMatches || req.body.matchesWon) {
            const winRate = player.totalMatches > 0
                ? ((player.matchesWon / player.totalMatches) * 100).toFixed(2)
                : 0;
            await player.update({ winRate });
        }

        res.json({
            success: true,
            message: 'Player updated successfully',
            data: player
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating player',
            error: error.message
        });
    }
};

// Delete player
exports.deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        await player.destroy();

        res.json({
            success: true,
            message: 'Player deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting player',
            error: error.message
        });
    }
};

// Update player statistics
exports.updatePlayerStats = async (req, res) => {
    try {
        const player = await Player.findByPk(req.params.id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: 'Player not found'
            });
        }

        const { matchesWon, totalMatches } = req.body;

        const winRate = totalMatches > 0
            ? ((matchesWon / totalMatches) * 100).toFixed(2)
            : 0;

        await player.update({
            matchesWon,
            totalMatches,
            winRate
        });

        res.json({
            success: true,
            message: 'Player statistics updated successfully',
            data: player
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating player statistics',
            error: error.message
        });
    }
};
