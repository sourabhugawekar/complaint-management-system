const express = require('express');
const router = express.Router();
const db = require('../db');

// ===================================
// CREATE - Add a new complaint
// ===================================
router.post('/complaints', async (req, res) => {
    try {
        const { name, email, phone, complaint_type, description } = req.body;

        // Validation
        if (!name || !email || !complaint_type || !description) {
            return res.status(400).json({ 
                error: 'Missing required fields: name, email, complaint_type, and description are required' 
            });
        }

        const query = `
            INSERT INTO complaints (name, email, phone, complaint_type, description) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.execute(query, [name, email, phone, complaint_type, description]);
        
        res.status(201).json({ 
            message: 'Complaint registered successfully!',
            complaintId: result.insertId 
        });
    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ error: 'Failed to register complaint' });
    }
});

// ===================================
// READ - Get all complaints
// ===================================
router.get('/complaints', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM complaints ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

// ===================================
// READ - Get a single complaint by ID
// ===================================
router.get('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.execute('SELECT * FROM complaints WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching complaint:', error);
        res.status(500).json({ error: 'Failed to fetch complaint' });
    }
});

// ===================================
// UPDATE - Update a complaint
// ===================================
router.put('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, complaint_type, description, status } = req.body;

        // Check if complaint exists
        const [existing] = await db.execute('SELECT * FROM complaints WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        const query = `
            UPDATE complaints 
            SET name = ?, email = ?, phone = ?, complaint_type = ?, description = ?, status = ?
            WHERE id = ?
        `;
        
        await db.execute(query, [name, email, phone, complaint_type, description, status, id]);
        
        res.json({ message: 'Complaint updated successfully!' });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ error: 'Failed to update complaint' });
    }
});

// ===================================
// UPDATE - Update complaint status only (Admin function)
// ===================================
router.patch('/complaints/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['Pending', 'In Progress', 'Resolved'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status. Must be: Pending, In Progress, or Resolved' 
            });
        }

        // Check if complaint exists
        const [existing] = await db.execute('SELECT * FROM complaints WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        await db.execute('UPDATE complaints SET status = ? WHERE id = ?', [status, id]);
        
        res.json({ message: 'Complaint status updated successfully!', status });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Failed to update complaint status' });
    }
});

// ===================================
// DELETE - Delete a complaint
// ===================================
router.delete('/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if complaint exists
        const [existing] = await db.execute('SELECT * FROM complaints WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        await db.execute('DELETE FROM complaints WHERE id = ?', [id]);
        
        res.json({ message: 'Complaint deleted successfully!' });
    } catch (error) {
        console.error('Error deleting complaint:', error);
        res.status(500).json({ error: 'Failed to delete complaint' });
    }
});

module.exports = router;
