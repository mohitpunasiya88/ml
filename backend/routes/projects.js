import express from 'express';
import { auth } from '../middleware/auth.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';
import Project from '../models/Project.js';
import { sendProjectNotification } from '../utils/email.js';

const router = express.Router();

// Get all projects with filters
router.get('/', auth, async (req, res, next) => {
  try {
    const { status, search, sort = '-createdAt' } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    if (search) {
      query.$text = { $search: search };
    }

    const projects = await Project.find(query)
      .sort(sort)
      .populate('createdBy', 'name email');

    res.json(projects);
  } catch (error) {
    next(error);
  }
});

// Create new project
router.post('/', auth, async (req, res, next) => {
  
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user.id
    });

    await project.save();
    
    // Send email notification
    // await sendProjectNotification(project);

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

// Get project by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('createdBy', 'name email');
      
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
});

// Update project
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    // Update allowed fields
    const updates = req.body;
    Object.keys(updates).forEach(key => {
      if (key !== '_id' && key !== 'createdBy') {
        project[key] = updates[key];
      }
    });

    await project.save();
    res.json(project);
  } catch (error) {
    next(error);
  }
});

// Get project statistics
router.get('/stats/overview', auth, async (req, res, next) => {
  try {
    const stats = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalHours = await Project.aggregate([
      {
        $match: {
          hoursWorked: { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$hoursWorked' }
        }
      }
    ]);

    const response = {
      newProjects: 0,
      sentToCEO: 0,
      approvedByClient: 0,
      invoiceRaised: 0,
      totalProjects: 0,
      totalHours: totalHours[0]?.total || 0
    };

    stats.forEach(stat => {
      switch (stat._id) {
        case 'New':
          response.newProjects = stat.count;
          break;
        case 'Sent to CEO':
          response.sentToCEO = stat.count;
          break;
        case 'Approved by Client':
          response.approvedByClient = stat.count;
          break;
        case 'Invoice Raised':
          response.invoiceRaised = stat.count;
          break;
      }
      response.totalProjects += stat.count;
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

// update status
router.post("/update",auth,async(req,res,next)=>{
  try {
    const { projectIds, status } = req.body;

    if (!Array.isArray(projectIds) || !status) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const result = await Project.updateMany(
      { _id: { $in: projectIds } },
      { $set: { status } }
    );

    res.status(200).json({
      message: 'Project statuses updated successfully',
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Error updating project statuses:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

// project details
router.get('/details/:id', auth, async (req, res, next) => {
  console.log(req.params.id,'req.params.id')
  try {
    const project = await Project.findOne({_id:req.params.id})
     
      
    if (!project) {
      throw new NotFoundError('Project not found');
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
});



export default router;