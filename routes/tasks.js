import express from 'express';
const router = express.Router();

import { getTask, getTaskByID,createTask, updateTask, deleteTask } from "../controller/tasks.js";
import validateToken from "../validateToken.js";

router.use(validateToken);

router.route('/')
  .get(getTask)
  .post(createTask);

router.route('/:id')
  .get(getTaskByID);

router.route('/:id')
  .put(updateTask);

router.route('/:id')
  .delete(deleteTask);

export default router;