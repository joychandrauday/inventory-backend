import { Request, Response } from 'express';
import ProductModel from '../models/product.model';

/**
 * Controller for product-related API endpoints
 */
const ProductController = {
    /**
     * Handles GET /products - Retrieves all products or filtered by category
     * @param req Express request object
     * @param res Express response object
     */
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const { category_id } = req.query;
            if (category_id && isNaN(Number(category_id))) {
                res.status(400).json({ error: 'Invalid category_id' });
                return;
            }
            const products = await ProductModel.getAll(category_id as string);
            res.status(200).json({ products });
        } catch (error: unknown) {
            console.error('Error in getAll products:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: (error as Error).message
            });
        }
    },

    /**
     * Handles POST /products - Creates a new product
     * @param req Express request object
     * @param res Express response object
     */
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, price, image, category_id } = req.body;

            // Basic validation
            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                res.status(400).json({ error: 'Name is required and must be a non-empty string' });
                return;
            }
            if (!price || isNaN(Number(price)) || Number(price) <= 0) {
                res.status(400).json({ error: 'Price is required and must be a positive number' });
                return;
            }
            if (!category_id || isNaN(Number(category_id))) {
                res.status(400).json({ error: 'Category ID is required and must be a number' });
                return;
            }
            if (image && typeof image !== 'string') {
                res.status(400).json({ error: 'Image must be a string (URL)' });
                return;
            }

            const product = await ProductModel.create({ name, price: Number(price), image, category_id: Number(category_id) });
            res.status(201).json(product);
        } catch (error: unknown) {
            console.error('Error in create product:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: (error as Error).message
            });
        }
    },

    /**
     * Handles DELETE /products/:id - Deletes a product by ID
     * @param req Express request object
     * @param res Express response object
     */
    delete: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'Invalid product ID' });
                return;
            }
            await ProductModel.delete(id);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error: unknown) {
            console.error('Error in delete product:', error);
            if ((error as Error).message.includes('Product not found')) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }
            res.status(500).json({
                error: 'Internal server error',
                message: (error as Error).message
            });
        }
    }
};

export default ProductController;