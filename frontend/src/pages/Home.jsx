import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileText, Shield, ArrowRight, CheckCircle2, Clock, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Easy Complaint Registration',
      description: 'Submit your complaints with a simple, user-friendly form',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Real-time Tracking',
      description: 'Track the status of your complaints in real-time',
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: 'Quick Resolution',
      description: 'Get your issues resolved promptly by our team',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Admin Management',
      description: 'Admins can efficiently manage and resolve all complaints',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Complaint Management System</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Manage Complaints Efficiently
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            A complete solution for registering, tracking, and resolving complaints.
            Choose your role to get started.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* User Dashboard Card */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">User Dashboard</CardTitle>
                <CardDescription>
                  Register and manage your complaints
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/user-dashboard">
                  <Button size="lg" className="w-full group">
                    Go to User Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Dashboard Card */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  Monitor and resolve all complaints
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/admin-dashboard">
                  <Button size="lg" variant="secondary" className="w-full group">
                    Go to Admin Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Key Features</h3>
          <p className="text-muted-foreground">Everything you need to manage complaints effectively</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Online Complaint Management System | Built with React, Node.js & MySQL</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
