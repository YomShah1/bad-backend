const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('rackets', 'shuttlecocks', 'shoes', 'apparel', 'accessories', 'bags'),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_available'
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Product;
