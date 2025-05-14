import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendProjectNotification = async (project) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.MANAGEMENT_EMAIL,
    subject: `New Project: ${project.projectName}`,
    html: `
      <h2>New Project Details</h2>
      <p><strong>Project Name:</strong> ${project.projectName}</p>
      <p><strong>Project Type:</strong> ${project.projectType}</p>
      ${project.category ? `<p><strong>Category:</strong> ${project.category}</p>` : ''}
      ${project.hoursWorked ? `<p><strong>Hours Worked:</strong> ${project.hoursWorked}</p>` : ''}
      <p><strong>Date Received:</strong> ${new Date(project.dateReceived).toLocaleDateString()}</p>
      <p><strong>Contact Person:</strong> ${project.contactPerson}</p>
      <p><strong>End Client:</strong> ${project.endClientName}</p>
      ${project.notes ? `<p><strong>Notes:</strong> ${project.notes}</p>` : ''}
    `
  };

  await transporter.sendMail(mailOptions);
};