import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { complaintAPI } from '@/api';
import { toast } from 'sonner';
import { Home, Loader2, RefreshCw, Trash2, Eye, Filter } from 'lucide-react';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

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

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await complaintAPI.updateStatus(id, newStatus);
      toast.success('Status updated successfully!');
      loadComplaints();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
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

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'In Progress':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Resolved':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // View complaint details
  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Monitor and manage all complaints</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.length}</div>
              <p className="text-xs text-muted-foreground">All complaints</p>
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
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {complaints.filter((c) => c.status === 'In Progress').length}
              </div>
              <p className="text-xs text-muted-foreground">Being addressed</p>
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
              <p className="text-xs text-muted-foreground">Completed</p>
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

          <Button variant="outline" onClick={loadComplaints}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Complaints Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredComplaints.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No complaints found</p>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Complaints ({filteredComplaints.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.id}</TableCell>
                      <TableCell>{complaint.name}</TableCell>
                      <TableCell className="text-sm">{complaint.email}</TableCell>
                      <TableCell>
                        <span className="text-sm">{complaint.complaint_type}</span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={complaint.status}
                          onValueChange={(value) => handleStatusUpdate(complaint.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue>
                              <Badge className={getStatusColor(complaint.status)}>
                                {complaint.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(complaint.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewComplaint(complaint)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteComplaint(complaint.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
            <DialogDescription>Complete information about this complaint</DialogDescription>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">ID</label>
                  <p className="text-sm">{selectedComplaint.id}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(selectedComplaint.status)}>
                      {selectedComplaint.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Name</label>
                  <p className="text-sm">{selectedComplaint.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Email</label>
                  <p className="text-sm">{selectedComplaint.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Phone</label>
                  <p className="text-sm">{selectedComplaint.phone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Type</label>
                  <p className="text-sm">{selectedComplaint.complaint_type}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Description</label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                  {selectedComplaint.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Created At</label>
                  <p className="text-sm">{formatDate(selectedComplaint.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Updated At</label>
                  <p className="text-sm">{formatDate(selectedComplaint.updated_at)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
