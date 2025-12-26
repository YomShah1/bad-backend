const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const matchRoutes = require('./routes/matches');
const tournamentRoutes = require('./routes/tournaments');
const playerRoutes = require('./routes/players');
const courtRoutes = require('./routes/courts');
const coachRoutes = require('./routes/coaches');
const shopRoutes = require('./routes/shop');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Badminton Management API',
        version: '1.0.0',
        endpoints: {
            matches: '/api/matches',
            tournaments: '/api/tournaments',
            players: '/api/players',
            courts: '/api/courts',
            coaches: '/api/coaches',
            shop: '/api/shop'
        }
    });
});

// API Routes
app.use('/api/matches', matchRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/courts', courtRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/shop', shopRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        // Test database connection
        const isConnected = await testConnection();

        if (!isConnected) {
            console.error('❌ Failed to connect to database. Please check your configuration.');
            process.exit(1);
        }

        // Sync database models (optional - be careful in production)
        // await syncDatabase();

        // Start listening
        app.listen(PORT, () => {
            console.log(`\n🚀 Server is running on port ${PORT}`);
            console.log(`📍 API URL: http://localhost:${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/\n`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error.message);
        process.exit(1);
    }
};

startServer();

module.exports = app;
