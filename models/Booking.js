const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'court_id'
    },
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'player_id'
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'booking_date'
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'start_time'
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        field: 'end_time'
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        defaultValue: 'pending'
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        field: 'total_amount'
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'bookings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Booking;
