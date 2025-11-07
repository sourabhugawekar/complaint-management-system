import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ComplaintForm from '@/components/ComplaintForm';
import ComplaintCard from '@/components/ComplaintCard';
import { complaintAPI } from '@/api';
import { toast } from 'sonner';
import { Plus, Filter, Home, Loader2, RefreshCw } from 'lucide-react';

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [submitting, setSubmitting] = useState(false);

  // Load complaints
  const loadComplaints = async () => {
    try {
      setLoading(true);
      const data = await complaintAPI.getAll();
      setComplaints(data);
      setFilteredComplaints(data);
      toast.success('Complaints loaded successfully');
    } catch (error) {
      console.error('Error loading complaints:', error);
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  // Filter complaints by status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(
        complaints.filter((c) => c.status === statusFilter)
      );
    }
  }, [statusFilter, complaints]);

  // Handle create complaint
  const handleCreateComplaint = async (formData) => {
    try {
      setSubmitting(true);
      await complaintAPI.create(formData);
      toast.success('Complaint created successfully!');
      setIsDialogOpen(false);
      loadComplaints();
    } catch (error) {
      console.error('Error creating complaint:', error);
      toast.error('Failed to create complaint');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle update complaint
  const handleUpdateComplaint = async (formData) => {
    try {
      setSubmitting(true);
      await complaintAPI.update(editingComplaint.id, formData);
      toast.success('Complaint updated successfully!');
      setIsDialogOpen(false);
      setEditingComplaint(null);
      loadComplaints();
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Failed to update complaint');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete complaint
  const handleDeleteComplaint = async (id) => {
    if (!confirm('Are you sure you want to delete this complaint?')) return;

    try {
      await complaintAPI.delete(id);
      toast.success('Complaint deleted successfully!');
      loadComplaints();
    } catch (error) {
      console.error('Error deleting complaint:', error);
      toast.error('Failed to delete complaint');
    }
  };

  // Handle edit click
  const handleEditClick = (complaint) => {
    setEditingComplaint(complaint);
    setIsDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingComplaint(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">User Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your complaints</p>
            </div>
            <Link to="/">
              <Button variant="outline">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {complaints.filter((c) => c.status === 'Pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {complaints.filter((c) => c.status === 'Resolved').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
          <div className="flex gap-2 items-center">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={loadComplaints}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Button>
          </div>
        </div>

        {/* Complaints Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredComplaints.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No complaints found</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint.id}
                complaint={complaint}
                onEdit={handleEditClick}
                onDelete={handleDeleteComplaint}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingComplaint ? 'Edit Complaint' : 'Create New Complaint'}
            </DialogTitle>
            <DialogDescription>
              {editingComplaint
                ? 'Update your complaint details below'
                : 'Fill in the form below to register a new complaint'}
            </DialogDescription>
          </DialogHeader>
          <ComplaintForm
            complaint={editingComplaint}
            onSubmit={editingComplaint ? handleUpdateComplaint : handleCreateComplaint}
            onCancel={handleDialogClose}
            isLoading={submitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
