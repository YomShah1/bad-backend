const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Coach = sequelize.define('Coach', {
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
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    specialization: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Years of experience'
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: 0.00
    },
    hourlyRate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'hourly_rate'
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_available'
    }
}, {
    tableName: 'coaches',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Coach;
