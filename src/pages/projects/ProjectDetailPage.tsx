import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Loader2, 
  Send, 
  Check, 
  FileText, 
  ArrowLeft, 
  Calendar, 
  Clock,
  Building,
  User,
  Info,
  FileType,
  Edit
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Project, ProjectStatus } from '../../types/Project';
import api from '../../services/api';
import ProjectStatusBadge from '../../components/projects/ProjectStatusBadge';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // In a real app, fetch from API
        const response = await api.get(`/projects/details/${id}`);
        console.log(response,'response')
        // For demonstration, create a mock project
        const mockProject = {
          id: id || '1',
          projectName: 'eCommerce Website Mockup',
          projectType: 'Mockups',
          category: 'Complex',
          dateReceived: new Date().toISOString(),
          contactPerson: 'John Smith',
          endClientName: 'Global Retail Inc.',
          dateDelivered: new Date(Date.now() + 604800000).toISOString(), // 7 days from now
          status: 'New' as ProjectStatus,
          notes: 'This project involves creating comprehensive mockups for an eCommerce website redesign. The client is looking for a modern, user-friendly interface with improved navigation and a streamlined checkout process.',
          createdBy: 'user123',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        toast.error('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const updateProjectStatus = async (newStatus: ProjectStatus) => {
    if (!project) return;
    
    setUpdating(true);
    try {
      // In a real app, update via API
      // await api.patch(`/projects/${id}`, { status: newStatus });
      
      // Mock update for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setProject({ ...project, status: newStatus });
      toast.success(`Project status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating project status:', error);
      toast.error('Failed to update project status');
    } finally {
      setUpdating(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={30} className="animate-spin text-purple-600" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 mb-4">Project not found</p>
        <button onClick={goBack} className="btn btn-outline flex items-center gap-2">
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button and header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button onClick={goBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft size={16} className="mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
          <div className="flex items-center mt-1">
            <ProjectStatusBadge status={project.status} />
          </div>
        </div>
        
        <div className="flex gap-2">
          {project.status === 'New' && (
            <button
              onClick={() => updateProjectStatus('Sent to CEO')}
              disabled={updating}
              className="btn btn-primary flex items-center gap-2"
            >
              {updating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              <span>Send to CEO</span>
            </button>
          )}
          
          {project.status === 'Sent to CEO' && (
            <button
              onClick={() => updateProjectStatus('Approved by Client')}
              disabled={updating}
              className="btn btn-primary flex items-center gap-2"
            >
              {updating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Check size={18} />
              )}
              <span>Mark as Approved</span>
            </button>
          )}
          
          {project.status === 'Approved by Client' && (
            <button
              onClick={() => updateProjectStatus('Invoice Raised')}
              disabled={updating}
              className="btn btn-primary flex items-center gap-2"
            >
              {updating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <FileText size={18} />
              )}
              <span>Raise Invoice</span>
            </button>
          )}
          
          <button className="btn btn-outline flex items-center gap-2">
            <Edit size={18} />
            <span>Edit</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Project details card */}
        <div className="md:col-span-2 card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <FileType size={16} className="mr-1" />
                  <span>Project Type</span>
                </div>
                <p className="text-gray-900">{project.projectType}</p>
                {project.category && <p className="text-sm text-gray-600">Category: {project.category}</p>}
                {project.hoursWorked && <p className="text-sm text-gray-600">Hours: {project.hoursWorked}</p>}
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar size={16} className="mr-1" />
                  <span>Date Received</span>
                </div>
                <p className="text-gray-900">{format(new Date(project.dateReceived), 'MMM d, yyyy')}</p>
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Clock size={16} className="mr-1" />
                  <span>Expected Delivery Date</span>
                </div>
                <p className="text-gray-900">{
                  project.dateDelivered 
                    ? format(new Date(project.dateDelivered), 'MMM d, yyyy')
                    : 'Not specified'
                }</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Building size={16} className="mr-1" />
                  <span>End Client</span>
                </div>
                <p className="text-gray-900">{project.endClientName}</p>
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <User size={16} className="mr-1" />
                  <span>Contact Person</span>
                </div>
                <p className="text-gray-900">{project.contactPerson}</p>
              </div>
              
              <div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Info size={16} className="mr-1" />
                  <span>Status</span>
                </div>
                <ProjectStatusBadge status={project.status} />
              </div>
            </div>
          </div>
          
          {/* Notes section */}
          {project.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-md font-medium text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-700 whitespace-pre-line">{project.notes}</p>
            </div>
          )}
        </div>
        
        {/* Activity timeline */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h2>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-purple-100 p-2">
                  <FileType size={16} className="text-purple-600" />
                </div>
                <div className="flex-1 w-px bg-gray-200 my-1"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Project Created</p>
                <p className="text-xs text-gray-500 mt-1">{format(new Date(project.createdAt), 'MMM d, yyyy')}</p>
                <p className="text-sm text-gray-600 mt-1">New project created with status "New"</p>
              </div>
            </div>
            
            {/* Conditional timeline items based on status */}
            {project.status === 'Sent to CEO' || project.status === 'Approved by Client' || project.status === 'Invoice Raised' ? (
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Send size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1 w-px bg-gray-200 my-1"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sent to CEO</p>
                  <p className="text-xs text-gray-500 mt-1">{format(new Date(project.updatedAt), 'MMM d, yyyy')}</p>
                  <p className="text-sm text-gray-600 mt-1">Project details sent to management for quoting</p>
                </div>
              </div>
            ) : null}
            
            {project.status === 'Approved by Client' || project.status === 'Invoice Raised' ? (
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="rounded-full bg-green-100 p-2">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 w-px bg-gray-200 my-1"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Approved by Client</p>
                  <p className="text-xs text-gray-500 mt-1">{format(new Date(project.updatedAt), 'MMM d, yyyy')}</p>
                  <p className="text-sm text-gray-600 mt-1">Client approved the project quote</p>
                </div>
              </div>
            ) : null}
            
            {project.status === 'Invoice Raised' ? (
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="rounded-full bg-amber-100 p-2">
                    <FileText size={16} className="text-amber-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Invoice Raised</p>
                  <p className="text-xs text-gray-500 mt-1">{format(new Date(project.updatedAt), 'MMM d, yyyy')}</p>
                  <p className="text-sm text-gray-600 mt-1">Invoice has been raised for the project</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;