const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tournament = sequelize.define('Tournament', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'start_date'
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'end_date'
    },
    prizePool: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'prize_pool'
    },
    maxParticipants: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'max_participants'
    },
    currentParticipants: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: 'current_participants'
    },
    status: {
        type: DataTypes.ENUM('registration_open', 'upcoming', 'ongoing', 'completed'),
        defaultValue: 'registration_open'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'tournaments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Tournament;
