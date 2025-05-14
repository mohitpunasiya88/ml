import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { MoreVertical, Eye, Send, Check, FileText } from 'lucide-react';

interface ProjectTableActionsProps {
  projectId: string;
  onSendToCEO?: () => void;
  onMarkApproved?: () => void;
  onRaiseInvoice?: () => void;
}

const ProjectTableActions = ({
  projectId,
  onSendToCEO,
  onMarkApproved,
  onRaiseInvoice,
}: ProjectTableActionsProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="rounded-full p-1 hover:bg-gray-100 focus:outline-none">
        <MoreVertical size={16} className="text-gray-500" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                to={`/projects/${projectId}`}
                className={`${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } flex items-center px-4 py-2 text-sm`}
              >
                <Eye size={16} className="mr-3 text-gray-500" />
                View Details
              </Link>
            )}
          </Menu.Item>
          
          {onSendToCEO && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onSendToCEO}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } flex items-center w-full text-left px-4 py-2 text-sm`}
                >
                  <Send size={16} className="mr-3 text-blue-500" />
                  Send to CEO
                </button>
              )}
            </Menu.Item>
          )}
          
          {onMarkApproved && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onMarkApproved}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } flex items-center w-full text-left px-4 py-2 text-sm`}
                >
                  <Check size={16} className="mr-3 text-green-500" />
                  Mark as Approved
                </button>
              )}
            </Menu.Item>
          )}
          
          {onRaiseInvoice && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onRaiseInvoice}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } flex items-center w-full text-left px-4 py-2 text-sm`}
                >
                  <FileText size={16} className="mr-3 text-amber-500" />
                  Raise Invoice
                </button>
              )}
            </Menu.Item>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default ProjectTableActions;