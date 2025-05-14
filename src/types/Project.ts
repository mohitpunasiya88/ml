export type ProjectType = 
  | 'Mockups' 
  | 'Proposals' 
  | 'Presentations' 
  | 'Credentials' 
  | 'RFP' 
  | 'AI Work' 
  | 'Creative Work';

export type ProjectCategory = 'Simple' | 'Medium' | 'Complex';

export type ProjectStatus = 
  | 'New' 
  | 'Sent to CEO' 
  | 'Approved by Client' 
  | 'Invoice Raised';

export interface Project {
  _id: string;
  id: string;
  projectName: string;
  projectType: ProjectType;
  category?: ProjectCategory;
  hoursWorked?: number;
  dateReceived: string;
  contactPerson: string;
  endClientName: string;
  dateDelivered?: string;
  status: ProjectStatus;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  projectName: string;
  projectType: ProjectType;
  category?: ProjectCategory;
  hoursWorked?: number;
  dateReceived: string;
  contactPerson: string;
  endClientName: string;
  dateDelivered?: string;
  notes?: string;
}