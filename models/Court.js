const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Court = sequelize.define('Court', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    courtType: {
        type: DataTypes.ENUM('synthetic', 'wooden', 'concrete'),
        allowNull: false,
        field: 'court_type'
    },
    location: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
        defaultValue: 'available'
    },
    pricePerHour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'price_per_hour'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'courts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Court;
