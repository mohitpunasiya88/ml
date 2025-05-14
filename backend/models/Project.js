import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  projectType: {
    type: String,
    required: true,
    enum: ['Mockups', 'Proposals', 'Presentations', 'Credentials', 'RFP', 'AI Work', 'Creative Work']
  },
  category: {
    type: String,
    enum: ['Simple', 'Medium', 'Complex'],
    required: function() {
      return ['Mockups', 'Proposals', 'Presentations', 'Credentials', 'RFP'].includes(this.projectType);
    }
  },
  hoursWorked: {
    type: Number,
    required: function() {
      return ['AI Work', 'Creative Work'].includes(this.projectType);
    },
    min: 0.5
  },
  dateReceived: {
    type: Date,
    required: true
  },
  dateDelivered: {
    type: Date
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  endClientName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Sent to CEO', 'Approved by Client', 'Invoice Raised'],
    default: 'New'
  },
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ status: 1, createdAt: -1 });
projectSchema.index({ projectName: 'text', endClientName: 'text', contactPerson: 'text' });

export default mongoose.model('Project', projectSchema);