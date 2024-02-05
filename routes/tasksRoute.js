import express from 'express';
import { createTask, delteTask, getAll, getAllTasks, getSpecificTask, updateTask } from '../controllers/tasksController.js';
import auth from '../middlewares/auth.js';

// validation middleware
import {taskvalidation} from '../middlewares/inputValidation.js';

const router=express.Router();

// get all tasks 

router.get('/',getAll)

// following endpoints are for a specific user or logged in  user

router.get('/user', auth, getAllTasks);

router.post('/', auth, taskvalidation, createTask);

router.get('/:id',auth, getSpecificTask);

router.delete('/:id',auth, delteTask);

router.put('/:id',auth,  taskvalidation, updateTask);
 
export default router;