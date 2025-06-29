import { Request, Response } from 'express';
import CategoryModel from '../models/category.model';

/**
 * Controller for category-related API endpoints
 */
const CategoryController = {
    /**
     * Handles GET /categories - Retrieves all categories
     * @param req Express request object
     * @param res Express response object
     */
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const categories = await CategoryModel.getAll();
            res.status(200).json(categories);
        } catch (error: unknown) {
            console.error('Error in getAll categories:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: (error as Error).message
            });
        }
    },

    /**
     * Handles POST /categories - Creates a new category
     * @param req Express request object
     * @param res Express response object
     */
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, image } = req.body;
            console.log(name, image);
            // Basic validation
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                res.status(400).json({ error: 'Name is required and must be a non-empty string' });
                return;
            }

            if (image && typeof image !== 'string') {
                res.status(400).json({ error: 'Image must be a string (URL)' });
                return;
            }

            const category = await CategoryModel.create({ name, image });
            console.log(name, image);
            res.status(201).json(category);
        } catch (error: unknown) {
            console.error('Error in create category:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: (error as Error).message
            });
        }
    },
};

export default CategoryController;