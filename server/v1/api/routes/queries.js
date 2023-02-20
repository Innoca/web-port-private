import { Router } from 'express';
const router = Router();
import { Types } from 'mongoose';
const mongoose = require('mongoose');

import UserQuery, { find } from '../models/Queries';
import { findById } from '../models/Queries';
import { queries_get_all, add_userQuery, queries_get_one, query_delete_one } from '../controllers/queries';
import checkAuth from '../middleware/check-auth';


// Get all queries

router.get('/', queries_get_all);
router.post('/', add_userQuery);
router.get('/:queryId', queries_get_one);
router.delete('/:queryId', query_delete_one);


export default router