import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, Edit, Trash2 } from 'lucide-react';

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

const ComplaintCard = ({ complaint, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{complaint.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Mail className="h-3 w-3" />
              {complaint.email}
            </CardDescription>
            {complaint.phone && (
              <CardDescription className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {complaint.phone}
              </CardDescription>
            )}
          </div>
          <Badge className={getStatusColor(complaint.status)}>
            {complaint.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <span className="text-sm font-semibold text-muted-foreground">Type:</span>
          <p className="text-sm">{complaint.complaint_type}</p>
        </div>
        <div>
          <span className="text-sm font-semibold text-muted-foreground">Description:</span>
          <p className="text-sm mt-1 line-clamp-3">{complaint.description}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {formatDate(complaint.created_at)}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(complaint)}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={() => onDelete(complaint.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
