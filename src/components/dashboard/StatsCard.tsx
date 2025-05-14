import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  linkTo?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  iconBgColor, 
  iconColor, 
  linkTo 
}: StatsCardProps) => {
  const content = (
    <div className="flex items-center p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-full mr-4 ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-xl font-semibold text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="block">{content}</Link>;
  }

  return content;
};

export default StatsCard;