const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ===================================
// Middleware
// ===================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from frontend directory
app.use(express.static('../frontend'));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ===================================
// Routes
// ===================================
app.use('/api', complaintRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('🚀 Online Complaint Management System API is running!');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// ===================================
// Start Server
// ===================================
app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════════════');
    console.log('🚀 Online Complaint Management System');
    console.log('═══════════════════════════════════════════════════');
    console.log(`📡 Server running on port ${PORT}`);
    console.log(`🌐 Access the app at: http://localhost:${PORT}`);
    console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
    console.log('═══════════════════════════════════════════════════');
});

module.exports = app;
