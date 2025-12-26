const { sequelize } = require('../config/database');

// Import all models
const Match = require('./Match');
const Tournament = require('./Tournament');
const Player = require('./Player');
const Court = require('./Court');
const Coach = require('./Coach');
const Product = require('./Product');
const Booking = require('./Booking');

// Define relationships
// Match relationships
Match.belongsTo(Player, { as: 'player1', foreignKey: 'player1_id' });
Match.belongsTo(Player, { as: 'player2', foreignKey: 'player2_id' });
Match.belongsTo(Court, { foreignKey: 'court_id' });
Match.belongsTo(Tournament, { foreignKey: 'tournament_id' });

// Tournament relationships
Tournament.hasMany(Match, { foreignKey: 'tournament_id' });

// Player relationships
Player.hasMany(Match, { as: 'matchesAsPlayer1', foreignKey: 'player1_id' });
Player.hasMany(Match, { as: 'matchesAsPlayer2', foreignKey: 'player2_id' });
Player.hasMany(Booking, { foreignKey: 'player_id' });

// Court relationships
Court.hasMany(Match, { foreignKey: 'court_id' });
Court.hasMany(Booking, { foreignKey: 'court_id' });

// Booking relationships
Booking.belongsTo(Court, { foreignKey: 'court_id' });
Booking.belongsTo(Player, { foreignKey: 'player_id' });

// Sync models (only in development, be careful in production)
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: false }); // Set to true only if you want to alter tables
        console.log('✅ All models synchronized successfully.');
    } catch (error) {
        console.error('❌ Error synchronizing models:', error.message);
    }
};

module.exports = {
    sequelize,
    Match,
    Tournament,
    Player,
    Court,
    Coach,
    Product,
    Booking,
    syncDatabase
};
