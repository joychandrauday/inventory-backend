import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

/**
 * Interface for a Category entity
 */
export interface Category {
    id: number;
    name: string;
    image: string | null;
}

/**
 * Interface for creating a new category
 */
export interface CategoryInput {
    name: string;
    image?: string | null;
}

/**
 * Category model for database operations
 */
const CategoryModel = {
    /**
     * Retrieves all categories from the database
     * @returns {Promise<Category[]>} List of categories
     * @throws {Error} If database query fails
     */
    getAll: async (): Promise<Category[]> => {
        try {
            const [rows] = await pool.query<(Category & RowDataPacket)[]>(
                'SELECT id, name, image FROM categories'
            );
            return rows as Category[];
        } catch (error: unknown) {
            throw new Error(`Failed to fetch categories: ${(error as Error).message}`);
        }
    },

    /**
     * Creates a new category in the database
     * @param input Category data to create
     * @returns {Promise<Category>} Created category
     * @throws {Error} If database query fails
     */
    create: async (input: CategoryInput): Promise<Category> => {
        try {
            const { name, image } = input;
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO categories (name, image) VALUES (?, ?)',
                [name, image || null]
            );
            return {
                id: result.insertId,
                name,
                image: image || null,
            };
        } catch (error: unknown) {
            throw new Error(`Failed to create category: ${(error as Error).message}`);
        }
    },
};

export default CategoryModel;