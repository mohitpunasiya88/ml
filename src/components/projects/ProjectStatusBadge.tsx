import { ProjectStatus } from '../../types/Project';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

const ProjectStatusBadge = ({ status }: ProjectStatusBadgeProps) => {
  const badgeClasses = () => {
    switch (status) {
      case 'New':
        return 'bg-purple-100 text-purple-800';
      case 'Sent to CEO':
        return 'bg-blue-100 text-blue-800';
      case 'Approved by Client':
        return 'bg-green-100 text-green-800';
      case 'Invoice Raised':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses()}`}>
      {status}
    </span>
  );
};

export default ProjectStatusBadge;