const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    playerId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        field: 'player_id'
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    totalMatches: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'total_matches'
    },
    matchesWon: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'matches_won'
    },
    winRate: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00,
        field: 'win_rate'
    },
    ranking: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'players',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Player;
