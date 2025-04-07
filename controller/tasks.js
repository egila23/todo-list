import express from 'express';
import asyncHandler from 'express-async-handler';
import Task from "../model/task.js"; // Changed variable name to avoid conflict
import login from '../controller/login.js'; // Assuming you have this middleware

const router = express.Router();

// POST - Create new task
const createTask= asyncHandler(async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        statusType: req.body.statusType,
        dueDate: req.body.dueDate,
        createdAt: req.body.createdAt || Date.now()
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
});

// GET - All tasks with optional filtering/sorting
const getTask = asyncHandler(async (req, res) => {
    // 1. Build the filter dynamically
    const filter = {};
    if (req.query.status) {
        filter.statusType = req.query.status; // Works for any status value
    }
    
    // 2. Enhanced sorting with defaults
    const sort = {};
    if (req.query.sort) {
        sort.dueDate = req.query.sort === 'asc' ? 1 : -1;
    } else {
        sort.createdAt = -1; // Default: newest first
    }

    // 3. Find tasks with better error handling
    const tasks = await Task.find(filter)
                          .sort(sort)
                          .select('-__v'); // Exclude version key

    // 4. Improved response format
    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks.length > 0 ? tasks : 'No tasks match your criteria'
    });
});
// const getTask=asyncHandler(async (req, res) => {
//     const filter = req.query.status === 'done' ? { statusType: 'done' } : {};
//     const sort = req.query.sort === 'asc' ? { dueDate: 1 } : { dueDate: -1 };
    
//     const tasks = await Task.find(filter).sort(sort);
    
//     if (tasks && tasks.length > 0) {
//         res.json(tasks);
//     } else {
//         res.status(404);
//         throw new Error('No tasks found');
//     }
// });

// GET - Single task by ID
const getTaskByID= asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    
    if (task) {
        res.json(task);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

// PUT - Update task
const updateTask=asyncHandler(async (req, res) => {
    const { title, description, statusType, dueDate } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        task.statusType = statusType || task.statusType;
        task.dueDate = dueDate || task.dueDate;
        
        const updatedTask = await task.save();
        res.json(updatedTask);
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

// DELETE - Remove task
const deleteTask= asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    
    if (task) {
        await task.deleteOne();
        res.json({ message: 'Task removed successfully' });
    } else {
        res.status(404);
        throw new Error('Task not found');
    }
});

export {getTask,getTaskByID,updateTask,deleteTask,createTask};