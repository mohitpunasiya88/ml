import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Save, Loader2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { ProjectFormData, ProjectType, ProjectCategory } from '../../types/Project';

const CreateProjectPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      projectName: '',
      projectType: 'Mockups',
      category: 'Simple',
      hoursWorked: undefined,
      dateReceived: new Date().toISOString().split('T')[0],
      contactPerson: '',
      endClientName: '',
      dateDelivered: '',
      notes: '',
    },
  });
  
  const projectType = watch('projectType');
  const needsCategory = ['Mockups', 'Proposals', 'Presentations', 'Credentials', 'RFP'].includes(projectType);
  const needsHours = ['AI Work', 'Creative Work'].includes(projectType);
  
  // Mock function to simulate contact suggestions
  const handleContactSearch = (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      return;
    }
    
    // Mock contacts - in a real app, this would be an API call
    const mockContacts = [
      'John Smith', 'Emily Johnson', 'Michael Wong', 'Sarah Miller',
      'David Brown', 'Jessica Lee', 'Robert Chen', 'Amanda Garcia',
    ];
    
    const filtered = mockContacts.filter(contact => 
      contact.toLowerCase().includes(value.toLowerCase())
    );
    
    setSuggestions(filtered);
  };
  
  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to create the project
      const response = await api.post('/projects/', data);
      
      console.log('Project data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Project created successfully');
      reset();
      navigate('/projects/new');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create project';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const cancelForm = () => {
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
      navigate(-1);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Name */}
              <div className="form-group">
                <label htmlFor="projectName" className="label">
                  Project Name*
                </label>
                <input
                  id="projectName"
                  type="text"
                  className={`input ${errors.projectName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter project name"
                  {...register('projectName', { required: 'Project name is required' })}
                />
                {errors.projectName && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
                )}
              </div>
              
              {/* Project Type */}
              <div className="form-group">
                <label htmlFor="projectType" className="label">
                  Project Type*
                </label>
                <select
                  id="projectType"
                  className={`select ${errors.projectType ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  {...register('projectType', { required: 'Project type is required' })}
                >
                  <option value="Mockups">Mockups</option>
                  <option value="Proposals">Proposals</option>
                  <option value="Presentations">Presentations</option>
                  <option value="Credentials">Credentials</option>
                  <option value="RFP">RFP</option>
                  <option value="AI Work">AI Work</option>
                  <option value="Creative Work">Creative Work</option>
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
                )}
              </div>
              
              {/* Project Category - only for specific project types */}
              {needsCategory && (
                <div className="form-group">
                  <label htmlFor="category" className="label">
                    Category*
                  </label>
                  <select
                    id="category"
                    className={`select ${errors.category ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    {...register('category', { required: needsCategory ? 'Category is required' : false })}
                  >
                    <option value="Simple">Simple</option>
                    <option value="Medium">Medium</option>
                    <option value="Complex">Complex</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>
              )}
              
              {/* Hours Worked - only for AI Work and Creative Work */}
              {needsHours && (
                <div className="form-group">
                  <label htmlFor="hoursWorked" className="label">
                    Hours Worked*
                  </label>
                  <input
                    id="hoursWorked"
                    type="number"
                    className={`input ${errors.hoursWorked ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Enter hours worked"
                    step="0.5"
                    min="0.5"
                    {...register('hoursWorked', {
                      required: needsHours ? 'Hours worked is required' : false,
                      min: {
                        value: 0.5,
                        message: 'Hours must be at least 0.5',
                      },
                    })}
                  />
                  {errors.hoursWorked && (
                    <p className="mt-1 text-sm text-red-600">{errors.hoursWorked.message}</p>
                  )}
                </div>
              )}
              
              {/* Date Received */}
              <div className="form-group">
                <label htmlFor="dateReceived" className="label">
                  Date Received*
                </label>
                <input
                  id="dateReceived"
                  type="date"
                  className={`input ${errors.dateReceived ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  {...register('dateReceived', { required: 'Date received is required' })}
                />
                {errors.dateReceived && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateReceived.message}</p>
                )}
              </div>
              
              {/* Contact Person with auto-suggestion */}
              <div className="form-group relative">
                <label htmlFor="contactPerson" className="label">
                  Contact Person*
                </label>
                <input
                  id="contactPerson"
                  type="text"
                  className={`input ${errors.contactPerson ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter contact person"
                  {...register('contactPerson', { required: 'Contact person is required' })}
                  onChange={(e) => handleContactSearch(e.target.value)}
                  autoComplete="off"
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          const input = document.getElementById('contactPerson') as HTMLInputElement;
                          if (input) {
                            input.value = suggestion;
                            setSuggestions([]);
                          }
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
                {errors.contactPerson && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
                )}
              </div>
              
              {/* End Client Name */}
              <div className="form-group">
                <label htmlFor="endClientName" className="label">
                  End Client Name*
                </label>
                <input
                  id="endClientName"
                  type="text"
                  className={`input ${errors.endClientName ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Enter end client name"
                  {...register('endClientName', { required: 'End client name is required' })}
                />
                {errors.endClientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.endClientName.message}</p>
                )}
              </div>
              
              {/* Date Delivered (optional) */}
              <div className="form-group">
                <label htmlFor="dateDelivered" className="label">
                  Date Delivered (Optional)
                </label>
                <input
                  id="dateDelivered"
                  type="date"
                  className="input"
                  {...register('dateDelivered')}
                />
              </div>
            </div>
            
            {/* Notes (optional) */}
            <div className="form-group">
              <label htmlFor="notes" className="label">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                className="textarea h-24"
                placeholder="Add any additional notes or details about the project"
                {...register('notes')}
              />
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={cancelForm}
                className="btn btn-outline flex items-center space-x-2"
                disabled={isSubmitting}
              >
                <XCircle size={18} />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Create Project</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;