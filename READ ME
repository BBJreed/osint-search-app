# OSINT Search Platform

A comprehensive Open Source Intelligence (OSINT) search platform for security researchers, investigators, and analysts.

![OSINT Platform](https://img.shields.io/badge/OSINT-Platform-blue)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Features

### Core Search Capabilities
- **👤 People Search** - Find individuals by name, email, phone
- **📧 Email Intelligence** - Email validation and associated accounts
- **📱 Phone Lookup** - Reverse phone number investigations
- **🔍 Username Search** - Cross-platform username discovery
- **📊 Social Media Intelligence** - Profile identification across platforms

### Advanced Features
- **📈 Data Visualization** - Interactive charts and analytics
- **📄 Report Generation** - Professional PDF reports
- **💾 Export Options** - CSV, JSON, PDF formats
- **🕐 Search History** - Track and replay searches
- **⚡ Batch Processing** - Bulk search operations
- **🎨 Modern UI** - Dark/light themes, responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/BBJreed/osint-search-app.git
cd osint-search-app

# Install dependencies
npm run install-all

# Configure environment
cp server/.env.example server/.env
# Edit server/.env with your API keys

# Start development servers
npm run dev
```

### Docker Deployment

```bash
# Build and start with Docker
docker-compose up --build

# Access application
# Frontend: http://localhost:3000
# API: http://localhost:5000
```

## 📖 Usage

### Basic Search
1. Navigate to the search dashboard
2. Select search type (Person, Email, Phone, Username)
3. Enter search parameters
4. Review results and export if needed

### API Usage
```javascript
// Example API call
const response = await fetch('http://localhost:5000/api/search/person', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    location: 'New York'
  })
});
```

## 🔧 Configuration

### API Keys Setup
Add the following to `server/.env`:

```env
# Email Intelligence
HUNTER_API_KEY=your_hunter_key
CLEARBIT_API_KEY=your_clearbit_key

# Phone Intelligence
NUMVERIFY_API_KEY=your_numverify_key

# Social Media
PIPL_API_KEY=your_pipl_key

# General
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS and theme files
│   └── package.json
├── server/                # Node.js backend API
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data models
│   │   └── routes/        # API routes
│   ├── config/           # Configuration files
│   └── package.json
├── docs/                 # Documentation
└── docker-compose.yml    # Docker configuration
```

## 🛡️ Security & Privacy

- **Data Protection**: No sensitive data stored permanently
- **API Security**: Rate limiting and input validation
- **Privacy First**: Search results are session-based
- **Compliance**: Follows OSINT ethical guidelines

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for legitimate OSINT research and security purposes only. Users are responsible for complying with applicable laws and ethical guidelines. Always respect privacy and terms of service of third-party platforms.

## 🔗 Resources

- [OSINT Framework](https://osintframework.com/)
- [OSINT Techniques](https://inteltechniques.com/)
- [API Documentation](docs/API.md)

---

**Built with ❤️ for the OSINT community**
