# 📋 Online Complaint Management System

A full-stack web application built with **Node.js**, **Express**, and **MySQL** for managing complaints with complete CRUD operations. Users can register complaints, view their status, and update or delete them, while admins can monitor and manage all complaints efficiently.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![MySQL](https://img.shields.io/badge/mysql-8.0-orange)
![License](https://img.shields.io/badge/license-ISC-yellow)

---

## ⚙️ Key Features

✅ **Complete CRUD Operations**
- Create new complaints
- Read/View all complaints
- Update complaint details and status
- Delete complaints

✅ **MySQL Database Integration** - Persistent data storage with relational database

✅ **Interactive Web Interface** - Clean and responsive UI built with HTML, CSS, and JavaScript

✅ **RESTful API** - Well-structured Express.js API endpoints

✅ **Status Management** - Track complaint status (Pending / In Progress / Resolved)

✅ **Real-time Updates** - Instant reflection of changes on the frontend

✅ **Filter Functionality** - Filter complaints by status

✅ **Responsive Design** - Mobile-friendly interface

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript (Fetch API) |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL 8.0 |
| **Development** | Nodemon, CORS, Body-parser |

---

## 📁 Project Structure

```
complaint-management-system/
│
├── backend/
│   ├── server.js              # Express server configuration
│   ├── db.js                  # MySQL connection pool
│   └── routes/
│       └── complaintRoutes.js # API endpoints for CRUD operations
│
├── frontend/
│   ├── index.html             # Main HTML interface
│   ├── script.js              # Frontend JavaScript (Fetch API)
│   └── style.css              # Responsive CSS styling
│
├── db.sql                     # Database schema and sample data
├── package.json               # Project dependencies
└── README.md                  # Documentation
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** (optional) - [Download](https://git-scm.com/)

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/sourabhugawekar/complaint-management-system.git
cd complaint-management-system
```

#### 2. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `mysql2` - MySQL client
- `cors` - Cross-Origin Resource Sharing
- `body-parser` - Request body parser
- `nodemon` - Auto-restart server (dev)

#### 3. Set Up MySQL Database

**Option 1: Using MySQL Command Line**

```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
source db.sql

# Or manually run:
CREATE DATABASE complaint_system;
USE complaint_system;
# Then copy and paste the SQL commands from db.sql
```

**Option 2: Using MySQL Workbench**

1. Open MySQL Workbench
2. Create a new connection (if not exists)
3. Open `db.sql` file
4. Execute the script

#### 4. Configure Database Connection

The default configuration in `backend/db.js` is:

```javascript
{
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'complaint_system'
}
```

If your MySQL credentials are different, update `backend/db.js` or set environment variables:

```bash
export DB_HOST=localhost
export DB_USER=your_username
export DB_PASSWORD=your_password
export DB_NAME=complaint_system
```

#### 5. Start the Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
═══════════════════════════════════════════════════
🚀 Online Complaint Management System
═══════════════════════════════════════════════════
✅ Database connected successfully!
📡 Server running on port 3000
🌐 Access the app at: http://localhost:3000
📊 API endpoint: http://localhost:3000/api
═══════════════════════════════════════════════════
```

#### 6. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🔧 Running in GitHub Codespaces

GitHub Codespaces provides a complete development environment in the cloud.

### Steps:

1. **Open in Codespaces**
   - Click the green **"Code"** button on GitHub
   - Select **"Create codespace on main"**
   - Wait for the environment to initialize

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up MySQL in Codespaces**
   
   Codespaces doesn't have MySQL by default. You can either:
   
   **Option A: Install MySQL locally in Codespace**
   ```bash
   sudo apt-get update
   sudo apt-get install mysql-server -y
   sudo service mysql start
   
   # Set up database
   sudo mysql < db.sql
   ```
   
   **Option B: Use a cloud MySQL service**
   - Set up a free MySQL instance on [Railway](https://railway.app/), [PlanetScale](https://planetscale.com/), or [AWS RDS](https://aws.amazon.com/rds/)
   - Update connection settings in `backend/db.js`

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Access the App**
   - Codespaces will automatically forward port 3000
   - Click the "Open in Browser" button when prompted
   - Or use the Ports panel to access the forwarded URL

---

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/complaints` | Get all complaints |
| `GET` | `/complaints/:id` | Get a specific complaint |
| `POST` | `/complaints` | Create a new complaint |
| `PUT` | `/complaints/:id` | Update a complaint |
| `PATCH` | `/complaints/:id/status` | Update complaint status only |
| `DELETE` | `/complaints/:id` | Delete a complaint |

### Example API Calls

**Create a Complaint:**
```bash
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "complaint_type": "Technical",
    "description": "Unable to login to my account"
  }'
```

**Get All Complaints:**
```bash
curl http://localhost:3000/api/complaints
```

**Update Status:**
```bash
curl -X PATCH http://localhost:3000/api/complaints/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Resolved"}'
```

**Delete a Complaint:**
```bash
curl -X DELETE http://localhost:3000/api/complaints/1
```

---

## 🎨 User Interface

### Main Features:

1. **Complaint Registration Form**
   - Name, Email, Phone
   - Complaint Type (Technical, Billing, Service, Product, Other)
   - Description

2. **Complaints Dashboard**
   - Grid view of all complaints
   - Status badges (Pending, In Progress, Resolved)
   - Filter by status
   - Real-time updates

3. **Complaint Actions**
   - Edit: Update complaint details and status
   - Delete: Remove complaint from database
   - View: See all complaint information

---

## 🗄️ Database Schema

### Complaints Table

```sql
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    complaint_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('Pending', 'In Progress', 'Resolved') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file (optional) for custom configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=complaint_system
```

---

## 🐛 Troubleshooting

### Common Issues:

**1. Database Connection Error**
```
❌ Database connection failed: connect ECONNREFUSED
```
**Solution:** Make sure MySQL server is running
```bash
# Windows
net start mysql

# Linux/Mac
sudo service mysql start
# or
brew services start mysql
```

**2. Access Denied Error**
```
❌ ER_ACCESS_DENIED_ERROR
```
**Solution:** Check MySQL credentials in `backend/db.js`

**3. Database Not Found**
```
❌ ER_BAD_DB_ERROR
```
**Solution:** Run the `db.sql` file to create the database

**4. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Kill the process using port 3000 or change the port
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in backend/server.js
```

---

## 📚 Learning Outcomes

This project demonstrates:

- ✅ Full-stack web development
- ✅ RESTful API design
- ✅ CRUD operations with MySQL
- ✅ Asynchronous JavaScript (async/await, Fetch API)
- ✅ Express.js middleware
- ✅ Database modeling and relationships
- ✅ Responsive web design
- ✅ Error handling and validation
- ✅ Git version control

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Sourabh Ugawekar**

- GitHub: [@sourabhugawekar](https://github.com/sourabhugawekar)

---

## 🙏 Acknowledgments

- Built for educational purposes
- Designed to be deployment-ready
- Optimized for GitHub Codespaces

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Review the code comments for implementation details

---

**Made with ❤️ for learning Full-Stack Development**