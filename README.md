# Badminton Management System - Backend API

A comprehensive Node.js backend API for managing badminton matches, tournaments, players, courts, coaches, and shop products.

## 🚀 Features

- **Matches Management**: Create, update, and track badminton matches (singles/doubles)
- **Tournament System**: Organize and manage tournaments with prize pools
- **Player Profiles**: Track player statistics, rankings, and win rates
- **Court Booking**: Book courts with availability checking
- **Coach Management**: Manage coach profiles and specializations
- **Shop**: Product catalog for badminton equipment and accessories

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (via HeidiSQL or any MySQL client)
- npm or yarn

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd bad-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Edit the `.env` file with your database credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=badminton_db
   DB_PORT=3306
   DB_DIALECT=mysql
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

### Matches
- `GET /api/matches` - Get all matches (supports filtering by status, matchType, tournamentId)
- `GET /api/matches/:id` - Get single match
- `POST /api/matches` - Create new match
- `PUT /api/matches/:id` - Update match
- `DELETE /api/matches/:id` - Delete match

### Tournaments
- `GET /api/tournaments` - Get all tournaments (supports filtering by status)
- `GET /api/tournaments/:id` - Get single tournament
- `POST /api/tournaments` - Create tournament
- `PUT /api/tournaments/:id` - Update tournament
- `DELETE /api/tournaments/:id` - Delete tournament

### Players
- `GET /api/players` - Get all players with rankings (supports search)
- `GET /api/players/:id` - Get player profile
- `POST /api/players` - Register new player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player
- `PUT /api/players/:id/stats` - Update player statistics

### Courts
- `GET /api/courts` - Get all courts (supports filtering by status, courtType)
- `GET /api/courts/:id` - Get court details
- `POST /api/courts` - Add new court
- `PUT /api/courts/:id` - Update court
- `DELETE /api/courts/:id` - Delete court
- `GET /api/courts/:courtId/availability` - Check court availability
- `POST /api/courts/:courtId/book` - Book a court

### Coaches
- `GET /api/coaches` - Get all coaches (supports search, filtering)
- `GET /api/coaches/:id` - Get coach profile
- `POST /api/coaches` - Add new coach
- `PUT /api/coaches/:id` - Update coach
- `DELETE /api/coaches/:id` - Delete coach

### Shop
- `GET /api/shop/products` - Get all products (supports category, search filtering)
- `GET /api/shop/products/:id` - Get product details
- `POST /api/shop/products` - Add new product
- `PUT /api/shop/products/:id` - Update product
- `DELETE /api/shop/products/:id` - Delete product
- `GET /api/shop/products/category/:category` - Get products by category

## 📝 Example Requests

### Create a Match
```json
POST /api/matches
{
  "matchType": "singles",
  "player1Id": 1,
  "player2Id": 2,
  "matchDate": "2024-03-15T14:00:00",
  "courtId": 1,
  "status": "scheduled"
}
```

### Create a Tournament
```json
POST /api/tournaments
{
  "name": "Summer Championship 2024",
  "startDate": "2024-06-15",
  "endDate": "2024-06-20",
  "prizePool": 5000,
  "maxParticipants": 32,
  "status": "registration_open"
}
```

### Create a Player
```json
POST /api/players
{
  "name": "John Doe",
  "email": "john@example.com",
  "playerId": "#001",
  "phone": "1234567890"
}
```

### Book a Court
```json
POST /api/courts/1/book
{
  "playerId": 1,
  "bookingDate": "2024-03-15",
  "startTime": "14:00:00",
  "endTime": "16:00:00",
  "notes": "Singles practice"
}
```

### Create a Product
```json
POST /api/shop/products
{
  "name": "Yonex Astrox 99",
  "category": "rackets",
  "price": 199.99,
  "stock": 15,
  "brand": "Yonex",
  "description": "Professional badminton racket"
}
```

## 🗄️ Database Schema

The API uses the following main tables:
- `matches` - Match records
- `tournaments` - Tournament information
- `players` - Player profiles and statistics
- `courts` - Court information
- `coaches` - Coach profiles
- `products` - Shop products
- `bookings` - Court booking records

## 🔧 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Validation**: express-validator
- **Security**: CORS enabled, bcrypt for password hashing

## 📂 Project Structure

```
bad-backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── matchController.js
│   ├── tournamentController.js
│   ├── playerController.js
│   ├── courtController.js
│   ├── coachController.js
│   └── shopController.js
├── models/
│   ├── Match.js
│   ├── Tournament.js
│   ├── Player.js
│   ├── Court.js
│   ├── Coach.js
│   ├── Product.js
│   ├── Booking.js
│   └── index.js
├── routes/
│   ├── matches.js
│   ├── tournaments.js
│   ├── players.js
│   ├── courts.js
│   ├── coaches.js
│   └── shop.js
├── middleware/
│   ├── errorHandler.js
│   └── validator.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🚦 Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| DB_HOST | Database host | 127.0.0.1 |
| DB_USER | Database user | root |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | badminton_db |
| DB_PORT | Database port | 3306 |

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify database credentials in `.env`
- Check if `badminton_db` database exists in HeidiSQL

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using port 5000

## 📄 License

ISC

## 👨‍💻 Author

Badminton Management System Team
