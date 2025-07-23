# The Greek Life App

A comprehensive platform for Greek life organizations to manage events, communications, and member engagement.

## Features

- **Event Management**: Create, manage, and track Greek life events
- **Member Communication**: Real-time messaging and announcements
- **Dashboard Analytics**: Track engagement and participation metrics
- **Responsive Design**: Works seamlessly across all devices
- **Real-time Updates**: Live notifications and updates using Socket.IO

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd theGreekLifeapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
# Start both frontend and backend
./start-app.sh

# Or start them separately:
npm start          # Frontend (React) on port 3000
npm run server     # Backend (Express) on port 3001
```

### Access Points

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3001/dashboard
- **API Health Check**: http://localhost:3001/api/health

## Project Structure

```
theGreekLifeapp/
├── src/                 # React frontend source code
├── public/              # Static assets
├── routes/              # Express API routes
├── backend/             # Additional backend services
├── server.js            # Express server entry point
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Development

### Available Scripts

- `npm start` - Start React development server
- `npm run server` - Start Express backend server
- `npm run dev` - Start backend with nodemon for development
- `npm run build` - Build production version
- `npm test` - Run tests

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
```

Key environment variables:
- `PORT` - Backend server port (default: 3001)
- `CORS_ORIGIN` - Allowed origins for CORS
- `NODE_ENV` - Environment (development/production)

## Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 