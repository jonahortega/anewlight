# Greek Life Connect Website

A professional marketing and lead generation website for the Greek Life Connect platform. This is a completely separate project from the main Greek Life app.

## Features

- **Professional Landing Page**: Modern, responsive design showcasing the platform
- **Contact Form**: Collect university and organization information
- **Admin Dashboard**: View and manage submissions
- **API Endpoints**: Receive data from the main app and contact forms
- **Real-time Updates**: Socket.IO integration for live data
- **Analytics Tracking**: Monitor website performance and user engagement

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Access the Website**
   - Main website: http://localhost:3001
   - Admin dashboard: http://localhost:3001/dashboard
   - API health check: http://localhost:3001/api/health

## Development

- **Development mode**: `npm run dev` (with auto-restart)
- **Build CSS**: `npm run build:css`
- **Watch CSS**: `npm run watch:css`

## API Endpoints

### Data Collection
- `POST /api/data/user` - Submit contact form data
- `POST /api/data/analytics` - Track analytics events
- `GET /api/data/users` - Get all submissions (dashboard)

### Analytics
- `GET /api/analytics/stats` - Get overall statistics
- `GET /api/analytics/events` - Get events with filtering
- `GET /api/analytics/real-time` - Get real-time activity

## Project Structure

```
greek-life-connect-site/
├── public/                 # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── index.html         # Main landing page
│   └── dashboard.html     # Admin dashboard
├── routes/                # API routes
│   ├── data.js           # Data collection endpoints
│   └── analytics.js      # Analytics endpoints
├── src/                   # Source files
│   └── styles/           # SCSS source files
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Integration with Main App

The website is designed to receive data from your main Greek Life app. Configure your app to send data to:

- **User Data**: `POST http://localhost:3001/api/data/user`
- **Analytics**: `POST http://localhost:3001/api/data/analytics`

## Environment Variables

Create a `.env` file based on `env.example`:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
API_KEY=your-secret-api-key
```

## Deployment

This website can be deployed to any Node.js hosting platform:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Deploy with Node.js build
- **Heroku**: Push to Heroku Git
- **DigitalOcean**: Deploy to App Platform

## License

MIT License - feel free to use this for your Greek Life Connect platform. 