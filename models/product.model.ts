import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string | null;
    category_id: number;
    created_at: Date;
    category_name?: string;
}

interface CreateProductInput {
    name: string;
    price: number;
    image?: string;
    category_id: number;
}

const ProductModel = {
    getAll: async (categoryId?: string): Promise<Product[]> => {
        try {
            let query = `
                SELECT p.id, p.name, p.price, p.image, p.created_at, c.name AS category_name
                FROM products p
                LEFT JOIN categories c ON p.category_id = c.id
            `;
            const params: string[] = [];
            if (categoryId) {
                query += ' WHERE p.category_id = ?';
                params.push(categoryId);
            }
            const [rows] = await pool.query<(Product & RowDataPacket)[]>(query, params);
            return rows as Product[];
        } catch (error: unknown) {
            throw new Error(`Failed to fetch products: ${(error as Error).message}`);
        }
    },

    create: async (input: CreateProductInput): Promise<Product> => {
        try {
            const { name, price, image, category_id } = input;
            const [result] = await pool.query<ResultSetHeader>(
                'INSERT INTO products (name, price, image, category_id) VALUES (?, ?, ?, ?)',
                [name, price, image || null, category_id]
            );
            return {
                id: result.insertId,
                name,
                price,
                image: image || null,
                category_id,
                created_at: new Date(),
            };
        } catch (error: unknown) {
            throw new Error(`Failed to create product: ${(error as Error).message}`);
        }
    },

    delete: async (id: string): Promise<void> => {
        try {
            const [result] = await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Product not found');
            }
        } catch (error: unknown) {
            throw new Error(`Failed to delete product: ${(error as Error).message}`);
        }
    },
};

export default ProductModel;