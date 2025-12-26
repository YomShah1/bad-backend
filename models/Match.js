const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Match = sequelize.define('Match', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    matchType: {
        type: DataTypes.ENUM('singles', 'doubles'),
        allowNull: false,
        field: 'match_type'
    },
    player1Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'player1_id'
    },
    player2Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'player2_id'
    },
    team1: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    team2: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    score: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled'
    },
    matchDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'match_date'
    },
    courtId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'court_id'
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'tournament_id'
    }
}, {
    tableName: 'matches',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Match;
