import * as XLSX from 'xlsx';
import { Project } from '../types/Project';
import { format } from 'date-fns';

export const exportToExcel = (projects: Project[], fileName: string): void => {
  // Convert projects to worksheet data
  const data = projects.map(project => ({
    'Project Name': project.projectName,
    'Project Type': project.projectType,
    'Category': project.category || '',
    'Hours Worked': project.hoursWorked || '',
    'Date Received': format(new Date(project.dateReceived), 'MM/dd/yyyy'),
    'Date Delivered': project.dateDelivered ? format(new Date(project.dateDelivered), 'MM/dd/yyyy') : '',
    'Contact Person': project.contactPerson,
    'End Client Name': project.endClientName,
    'Status': project.status,
    'Notes': project.notes || '',
  }));

  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');

  // Adjust column widths
  const colWidths = [
    { wch: 30 }, // Project Name
    { wch: 15 }, // Project Type
    { wch: 10 }, // Category
    { wch: 12 }, // Hours Worked
    { wch: 15 }, // Date Received
    { wch: 15 }, // Date Delivered
    { wch: 20 }, // Contact Person
    { wch: 25 }, // End Client Name
    { wch: 18 }, // Status
    { wch: 40 }, // Notes
  ];
  worksheet['!cols'] = colWidths;

  // Generate Excel file and download
  const dateString = format(new Date(), 'yyyyMMdd');
  const fullFileName = `${fileName}_${dateString}.xlsx`;
  XLSX.writeFile(workbook, fullFileName);
};