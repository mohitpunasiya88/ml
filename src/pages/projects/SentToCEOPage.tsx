import { useState, useEffect } from 'react';
import { Loader2, Search, Download, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Project } from '../../types/Project';
import api from '../../services/api';
import ProjectStatusBadge from '../../components/projects/ProjectStatusBadge';
import ProjectTableActions from '../../components/projects/ProjectTableActions';
import { exportToExcel } from '../../utils/exportUtils';

const SentToCEOPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const fetchProjects = async () => {
      try {
        // In a real app, fetch from API
        const response = await api.get('/projects?status=Sent to CEO');
        
        // Mock data for demonstration
        // const mockProjects = [
        //   {
        //     id: '6',
        //     projectName: 'Mobile App Wireframes',
        //     projectType: 'Mockups',
        //     category: 'Complex',
        //     dateReceived: new Date(Date.now() - 86400000).toISOString(),
        //     contactPerson: 'Jessica Lee',
        //     endClientName: 'Mobile Solutions Inc.',
        //     status: 'Sent to CEO',
        //     createdBy: 'user123',
        //     createdAt: new Date(Date.now() - 86400000).toISOString(),
        //     updatedAt: new Date(Date.now() - 86400000).toISOString(),
        //   },
        //   {
        //     id: '7',
        //     projectName: 'Annual Report Design',
        //     projectType: 'Creative Work',
        //     hoursWorked: 20,
        //     dateReceived: new Date(Date.now() - 172800000).toISOString(),
        //     contactPerson: 'Robert Chen',
        //     endClientName: 'Financial Corp Ltd.',
        //     status: 'Sent to CEO',
        //     createdBy: 'user123',
        //     createdAt: new Date(Date.now() - 172800000).toISOString(),
        //     updatedAt: new Date(Date.now() - 172800000).toISOString(),
        //   },
        //   {
        //     id: '8',
        //     projectName: 'Government RFP Response',
        //     projectType: 'RFP',
        //     category: 'Complex',
        //     dateReceived: new Date(Date.now() - 259200000).toISOString(),
        //     contactPerson: 'Amanda Garcia',
        //     endClientName: 'Government Agency',
        //     status: 'Sent to CEO',
        //     createdBy: 'user123',
        //     createdAt: new Date(Date.now() - 259200000).toISOString(),
        //     updatedAt: new Date(Date.now() - 259200000).toISOString(),
        //   },
        // ] as Project[];
        
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
  

    fetchProjects();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter(project => 
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.endClientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProjects(filteredProjects.map(project => project._id));
    } else {
      setSelectedProjects([]);
    }
  };

  const handleSelect = (id: string) => {
    if (selectedProjects.includes(id)) {
      setSelectedProjects(selectedProjects.filter(projectId => projectId !== id));
    } else {
      setSelectedProjects([...selectedProjects, id]);
    }
  };

  const handleExport = () => {
    const projectsToExport = filteredProjects.filter(project => 
      selectedProjects.length === 0 || selectedProjects.includes(project.id)
    );
    
    if (projectsToExport.length === 0) {
      toast.error('No projects selected for export');
      return;
    }
    
    exportToExcel(projectsToExport, 'Sent_To_CEO_Projects');
    toast.success(`Exported ${projectsToExport.length} projects to Excel`);
  };

  const handleMarkAsApproved = async () => {
    if (selectedProjects.length === 0) {
      toast.error('No projects selected');
      return;
    }
    
    try {
      // In a real app, send to API
      await api.post('/projects/update', { projectIds: selectedProjects, status:"Approved by Client" });

      
      // Mock update for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
    fetchProjects();
      
      toast.success(`${selectedProjects.length} projects marked as approved by client`);
      
      // Update local state to reflect changes
      setProjects(projects.filter(project => !selectedProjects.includes(project.id)));
      setSelectedProjects([]);
    } catch (error) {
      console.error('Error marking projects as approved:', error);
      toast.error('Failed to update project status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={30} className="animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="pl-10 input max-w-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport}
            className="btn btn-outline flex items-center gap-2"
          >
            <Download size={18} />
            <span>Export</span>
          </button>
          <button 
            onClick={handleMarkAsApproved}
            disabled={selectedProjects.length === 0}
            className="btn btn-primary flex items-center gap-2"
          >
            <CheckCircle size={18} />
            <span>Mark as Approved</span>
          </button>
        </div>
      </div>
      
      {/* Projects table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      onChange={handleSelectAll}
                      checked={
                        selectedProjects.length > 0 && 
                        selectedProjects.length === filteredProjects.length
                      }
                    />
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type/Category
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Received
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                        checked={selectedProjects.includes(project._id)}
                        onChange={() => handleSelect(project._id)}
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{project.projectName}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{project.projectType}</div>
                      {project.category ? (
                        <div className="text-xs text-gray-500">{project.category}</div>
                      ) : project.hoursWorked ? (
                        <div className="text-xs text-gray-500">{project.hoursWorked} hours</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{project.endClientName}</div>
                      <div className="text-xs text-gray-500">{project.contactPerson}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {format(new Date(project.dateReceived), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <ProjectStatusBadge status={project.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ProjectTableActions 
                        projectId={project._id} 
                        onMarkApproved={() => {
                          setSelectedProjects([project._id]);
                          handleMarkAsApproved();
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                    {searchTerm 
                      ? 'No projects found matching your search criteria' 
                      : 'No projects sent to CEO available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SentToCEOPage;