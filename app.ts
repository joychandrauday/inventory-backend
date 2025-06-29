import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { categoryRoutes } from './routes/category.routes';
import { productRoutes } from './routes/product.routes';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(cors({
    origin: [],
    credentials: true
}));
// Allowed origins
const allowedOrigins = [
    'http://localhost:5137', 'https://inventorymanagement-hazel.vercel.app'
];

// CORS middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

app.options('*', cors());

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Inventory management system.',
        version: '1.0.0',
    });
})
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});