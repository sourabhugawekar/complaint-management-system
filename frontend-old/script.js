// ===================================
// API Configuration
// ===================================
const API_URL = 'http://localhost:3000/api';

// Global variables
let editingComplaintId = null;

// ===================================
// DOM Elements
// ===================================
const complaintForm = document.getElementById('complaintForm');
const editForm = document.getElementById('editForm');
const editModal = document.getElementById('editModal');
const closeModal = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const statusFilter = document.getElementById('statusFilter');
const complaintsContainer = document.getElementById('complaintsContainer');

// ===================================
// Event Listeners
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadComplaints();
    
    complaintForm.addEventListener('submit', handleSubmitComplaint);
    editForm.addEventListener('submit', handleUpdateComplaint);
    statusFilter.addEventListener('change', loadComplaints);
    closeModal.addEventListener('click', () => editModal.style.display = 'none');
    cancelBtn.addEventListener('click', resetForm);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});

// ===================================
// Load All Complaints
// ===================================
async function loadComplaints() {
    try {
        complaintsContainer.innerHTML = '<div class="loading">Loading complaints...</div>';
        
        const response = await fetch(`${API_URL}/complaints`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch complaints');
        }
        
        const complaints = await response.json();
        
        // Apply filter
        const filterValue = statusFilter.value;
        const filteredComplaints = filterValue === 'all' 
            ? complaints 
            : complaints.filter(c => c.status === filterValue);
        
        displayComplaints(filteredComplaints);
    } catch (error) {
        console.error('Error loading complaints:', error);
        complaintsContainer.innerHTML = `
            <div class="no-complaints">
                <h3>❌ Error Loading Complaints</h3>
                <p>${error.message}</p>
                <p>Make sure the server is running on port 3000</p>
            </div>
        `;
    }
}

// ===================================
// Display Complaints
// ===================================
function displayComplaints(complaints) {
    if (complaints.length === 0) {
        complaintsContainer.innerHTML = `
            <div class="no-complaints">
                <h3>📭 No Complaints Found</h3>
                <p>There are no complaints matching your filter criteria.</p>
            </div>
        `;
        return;
    }
    
    complaintsContainer.innerHTML = complaints.map(complaint => `
        <div class="complaint-card">
            <div class="complaint-header">
                <span class="complaint-id">ID: ${complaint.id}</span>
                <span class="status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}">
                    ${complaint.status}
                </span>
            </div>
            
            <div class="complaint-info">
                <h3>${complaint.name}</h3>
                <div class="email">✉️ ${complaint.email}</div>
                ${complaint.phone ? `<div class="phone">📞 ${complaint.phone}</div>` : ''}
            </div>
            
            <div class="complaint-type">
                🏷️ ${complaint.complaint_type}
            </div>
            
            <div class="complaint-description">
                ${complaint.description}
            </div>
            
            <div class="complaint-footer">
                <div class="complaint-date">
                    📅 ${new Date(complaint.created_at).toLocaleString()}
                </div>
                <div class="complaint-actions">
                    <button class="btn btn-edit" onclick="openEditModal(${complaint.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-delete" onclick="deleteComplaint(${complaint.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// Submit New Complaint
// ===================================
async function handleSubmitComplaint(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        complaint_type: document.getElementById('complaint_type').value,
        description: document.getElementById('description').value
    };
    
    try {
        const response = await fetch(`${API_URL}/complaints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit complaint');
        }
        
        alert('✅ Complaint registered successfully!');
        complaintForm.reset();
        loadComplaints();
    } catch (error) {
        console.error('Error submitting complaint:', error);
        alert('❌ Error: ' + error.message);
    }
}

// ===================================
// Open Edit Modal
// ===================================
async function openEditModal(id) {
    try {
        const response = await fetch(`${API_URL}/complaints/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch complaint details');
        }
        
        const complaint = await response.json();
        
        // Populate form
        document.getElementById('editId').value = complaint.id;
        document.getElementById('editName').value = complaint.name;
        document.getElementById('editEmail').value = complaint.email;
        document.getElementById('editPhone').value = complaint.phone || '';
        document.getElementById('editComplaintType').value = complaint.complaint_type;
        document.getElementById('editDescription').value = complaint.description;
        document.getElementById('editStatus').value = complaint.status;
        
        // Show modal
        editModal.style.display = 'block';
    } catch (error) {
        console.error('Error fetching complaint:', error);
        alert('❌ Error: ' + error.message);
    }
}

// ===================================
// Update Complaint
// ===================================
async function handleUpdateComplaint(e) {
    e.preventDefault();
    
    const id = document.getElementById('editId').value;
    const formData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        complaint_type: document.getElementById('editComplaintType').value,
        description: document.getElementById('editDescription').value,
        status: document.getElementById('editStatus').value
    };
    
    try {
        const response = await fetch(`${API_URL}/complaints/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update complaint');
        }
        
        alert('✅ Complaint updated successfully!');
        editModal.style.display = 'none';
        loadComplaints();
    } catch (error) {
        console.error('Error updating complaint:', error);
        alert('❌ Error: ' + error.message);
    }
}

// ===================================
// Delete Complaint
// ===================================
async function deleteComplaint(id) {
    if (!confirm('Are you sure you want to delete this complaint?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/complaints/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to delete complaint');
        }
        
        alert('✅ Complaint deleted successfully!');
        loadComplaints();
    } catch (error) {
        console.error('Error deleting complaint:', error);
        alert('❌ Error: ' + error.message);
    }
}

// ===================================
// Reset Form
// ===================================
function resetForm() {
    complaintForm.reset();
    editingComplaintId = null;
    document.getElementById('formBtnText').textContent = 'Submit Complaint';
    cancelBtn.style.display = 'none';
}

// ===================================
// Utility Functions
// ===================================
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
