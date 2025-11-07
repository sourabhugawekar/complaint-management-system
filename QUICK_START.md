# 🎯 Quick Start Guide

## Prerequisites Installed ✅
- ✅ Node.js
- ✅ MySQL 8.0
- ✅ All npm dependencies

## Current Status
✅ Server is running on port 3000
✅ Database connected successfully
✅ Sample data loaded (5 complaints)

## Access the Application

### Web Interface
Open your browser and go to:
```
http://localhost:3000
```

Or use the forwarded port in GitHub Codespaces.

### API Endpoints
Base URL: `http://localhost:3000/api`

**Available Endpoints:**
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get specific complaint
- `POST /api/complaints` - Create new complaint
- `PUT /api/complaints/:id` - Update complaint
- `PATCH /api/complaints/:id/status` - Update status only
- `DELETE /api/complaints/:id` - Delete complaint

## Test API with curl

### Get all complaints:
```bash
curl http://localhost:3000/api/complaints
```

### Create a new complaint:
```bash
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "complaint_type": "Technical",
    "description": "Test complaint"
  }'
```

### Update complaint status:
```bash
curl -X PATCH http://localhost:3000/api/complaints/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Resolved"}'
```

### Delete a complaint:
```bash
curl -X DELETE http://localhost:3000/api/complaints/1
```

## Available Scripts

```bash
# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev
```

## Database Access

To access MySQL directly:
```bash
sudo mysql complaint_system
```

### View all complaints:
```sql
SELECT * FROM complaints;
```

### Check database structure:
```sql
DESCRIBE complaints;
```

## Troubleshooting

### If server stops:
```bash
npm start
```

### If MySQL is not running:
```bash
sudo service mysql start
```

### Reset database:
```bash
sudo mysql < db.sql
```

### Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Features to Test

1. **Create Complaint**: Fill out the form and submit
2. **View Complaints**: See all complaints in card layout
3. **Filter**: Use status dropdown to filter complaints
4. **Edit**: Click edit button to modify complaint
5. **Update Status**: Change complaint status (Pending/In Progress/Resolved)
6. **Delete**: Remove complaints you no longer need
7. **Refresh**: Click refresh to reload data

## File Structure

```
complaint-management-system/
├── backend/
│   ├── server.js           # Main server file
│   ├── db.js              # Database connection
│   └── routes/
│       └── complaintRoutes.js  # API routes
├── frontend/
│   ├── index.html         # Main page
│   ├── script.js          # Frontend logic
│   └── style.css          # Styling
├── db.sql                 # Database schema
├── package.json           # Dependencies
└── README.md             # Full documentation
```

## Next Steps

1. ✅ Server is running
2. ✅ Database is connected
3. 🌐 Open http://localhost:3000 in your browser
4. 🎨 Interact with the web interface
5. 📝 Register new complaints
6. ✏️ Edit and update existing complaints
7. 🗑️ Delete complaints when resolved

## Support

Check README.md for detailed documentation and troubleshooting steps.

---
**Status: 🟢 READY TO USE**
