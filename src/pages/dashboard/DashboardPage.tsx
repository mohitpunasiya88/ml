import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderPlus, 
  FolderSync, 
  CheckCircle, 
  FileCheck, 
  Clock, 
  Briefcase,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import api from '../../services/api';
import { Project } from '../../types/Project';
import StatsCard from '../../components/dashboard/StatsCard';
import RecentProjectsList from '../../components/dashboard/RecentProjectsList';

interface DashboardStats {
  newProjects: number;
  sentToCEO: number;
  approvedByClient: number;
  invoiceRaised: number;
  totalProjects: number;
  totalHours: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would be a real API call in production
        const [statsResponse,mockStats]: any[] = await Promise.all([
          api.get('/projects/'),
          api.get('/projects/stats/overview')
        ]);
        // Mocked data for demonstration
        // const mockStats = {
        //   newProjects: 5,
        //   sentToCEO: 8,
        //   approvedByClient: 12,
        //   invoiceRaised: 7,
        //   totalProjects: 32,
        //   totalHours: 126
        // };
        
        // const mockRecentProjects = [
        //   {
        //     id: '1',
        //     projectName: 'eCommerce Mockup Design',
        //     projectType: 'Mockups',
        //     category: 'Complex',
        //     dateReceived: new Date().toISOString(),
        //     contactPerson: 'John Smith',
        //     endClientName: 'Global Retail Inc.',
        //     status: 'New',
        //     createdBy: 'user123',
        //     createdAt: new Date().toISOString(),
        //     updatedAt: new Date().toISOString(),
        //   },
        //   {
        //     id: '2',
        //     projectName: 'Marketing Presentation',
        //     projectType: 'Presentations',
        //     category: 'Medium',
        //     dateReceived: new Date(Date.now() - 86400000).toISOString(),
        //     contactPerson: 'Emily Johnson',
        //     endClientName: 'TechFusion Labs',
        //     status: 'Sent to CEO',
        //     createdBy: 'user123',
        //     createdAt: new Date(Date.now() - 86400000).toISOString(),
        //     updatedAt: new Date(Date.now() - 86400000).toISOString(),
        //   },
        //   {
        //     id: '3',
        //     projectName: 'AI Content Generation',
        //     projectType: 'AI Work',
        //     hoursWorked: 12,
        //     dateReceived: new Date(Date.now() - 172800000).toISOString(),
        //     contactPerson: 'Michael Wong',
        //     endClientName: 'Innovate Solutions',
        //     status: 'Approved by Client',
        //     createdBy: 'user123',
        //     createdAt: new Date(Date.now() - 172800000).toISOString(),
        //     updatedAt: new Date(Date.now() - 86400000).toISOString(),
        //   },
        //   {
        //     id: '4',
        //     projectName: 'Product Catalog Design',
        //     projectType: 'Creative Work',
        //     hoursWorked: 15,
        //     dateReceived: new Date(Date.now() - 259200000).toISOString(),
        //     contactPerson: 'Sarah Miller',
        //     endClientName: 'Fashion Forward',
        //     status: 'Invoice Raised',
        //     createdBy: 'user123',
        //     createdAt: new Date(Date.now() - 259200000).toISOString(),
        //     updatedAt: new Date(Date.now() - 86400000).toISOString(),
        //   },
        // ] as Project[];
        
        setStats(mockStats.data);
        setRecentProjects(statsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={30} className="animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard 
          title="New Projects"
          value={stats?.newProjects || 0}
          icon={<FolderPlus size={20} />}
          linkTo="/projects/new"
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatsCard 
          title="Sent to CEO"
          value={stats?.sentToCEO || 0}
          icon={<FolderSync size={20} />}
          linkTo="/projects/sent-to-ceo"
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard 
          title="Approved by Client"
          value={stats?.approvedByClient || 0}
          icon={<CheckCircle size={20} />}
          linkTo="/projects/approved-by-client"
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard 
          title="Invoice Raised"
          value={stats?.invoiceRaised || 0}
          icon={<FileCheck size={20} />}
          linkTo="/projects/invoice-raised"
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatsCard 
          title="Total Projects"
          value={stats?.totalProjects || 0}
          icon={<Briefcase size={20} />}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatsCard 
          title="Total Hours"
          value={stats?.totalHours || 0}
          icon={<Clock size={20} />}
          iconBgColor="bg-teal-100"
          iconColor="text-teal-600"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
          <Link 
            to="/projects/create" 
            className="btn btn-primary"
          >
            <FolderPlus size={18} className="mr-2" />
            New Project
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <RecentProjectsList projects={recentProjects} />
        </div>
      </div>
      
      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h2>
          <div className="space-y-4">
            {recentProjects.length > 0 ? (
              recentProjects.slice(0, 3).map((project, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-md bg-gray-50">
                  <div className={`p-2 rounded-full ${
                    project.status === 'New' ? 'bg-purple-100 text-purple-600' :
                    project.status === 'Sent to CEO' ? 'bg-blue-100 text-blue-600' :
                    project.status === 'Approved by Client' ? 'bg-green-100 text-green-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {project.status === 'New' ? <FolderPlus size={16} /> :
                     project.status === 'Sent to CEO' ? <FolderSync size={16} /> :
                     project.status === 'Approved by Client' ? <CheckCircle size={16} /> :
                     <FileCheck size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/projects/${project.id}`} className="text-sm font-medium text-gray-900 hover:text-purple-600 truncate block">
                      {project.projectName}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      Status updated to <span className="font-medium">{project.status}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(project.updatedAt), 'h:mm a')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No activity for today</p>
            )}
          </div>
        </div>
        
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Mockups</span>
              <span className="text-sm font-medium text-gray-900">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Proposals</span>
              <span className="text-sm font-medium text-gray-900">6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Presentations</span>
              <span className="text-sm font-medium text-gray-900">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Credentials</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">RFP</span>
              <span className="text-sm font-medium text-gray-900">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AI Work</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Creative Work</span>
              <span className="text-sm font-medium text-gray-900">3</span>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200">
              <div className="flex justify-between items-center font-medium">
                <span className="text-sm text-gray-900">Total</span>
                <span className="text-sm text-gray-900">{stats?.totalProjects || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;