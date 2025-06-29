import express from 'express';
import CategoryController from '../controllers/category.controller';

const router = express.Router();

router.post('/', CategoryController.create);
router.get('/', CategoryController.getAll);

export const categoryRoutes = router;