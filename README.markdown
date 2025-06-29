# Inventory Management Backend

## Overview
Backend for a Product Inventory Management System using **Node.js**, **Express**, and **MySQL**. Deployed at `https://inventory-backend-2spe.onrender.com`. Supports CORS for `https://inventorymanagement-hazel.vercel.app` and `http://localhost:5173`.

## Tech Stack
- **Node.js**: v16+
- **Express**: RESTful API
- **MySQL**: v8+
- **Dependencies**: `express`, `cors`, `mysql2`, `dotenv`
- **Deployment**: Render

## API Endpoints
| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| GET    | `/`                          | Welcome message                 |
| GET    | `/categories`                | List all categories             |
| GET    | `/products`                  | List all products               |
| GET    | `/products?category_id=<id>` | Filter products by category     |
| POST   | `/products`                  | Add a product                   |
| DELETE | `/products/:id`              | Delete a product                |

**POST /products Payload**:
```json
{
  "name": "Sample Product",
  "price": 29.99,
  "image": "https://example.com/image.jpg",
  "category_id": 1
}
```

## Setup
1. **Clone Repository**:
   ```bash
   git clone <repository-url>
   cd backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Create `.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=inventory_db
   ```
4. **Setup MySQL**:
   Run `database/schema.sql`:
   ```sql
   CREATE TABLE categories (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );
   CREATE TABLE products (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     price DECIMAL(10, 2) NOT NULL,
     image VARCHAR(255),
     category_id INT,
     FOREIGN KEY (category_id) REFERENCES categories(id)
   );
   ```
   Seed categories (optional):
   ```sql
   INSERT INTO categories (name) VALUES ('Electronics'), ('Clothing'), ('Books');
   ```
5. **Start Server**:
   ```bash
   npm start
   ```
   Runs on `http://localhost:5000`.

## Testing with Postman
1. Install Postman: [https://www.postman.com/downloads/](https://www.postman.com/downloads/).
2. Create a collection with these requests:
   - **GET /**: `{{baseUrl}}/`
   - **GET /categories**: `{{baseUrl}}/categories`
   - **GET /products**: `{{baseUrl}}/products`
   - **GET /products?category_id=1**: `{{baseUrl}}/products?category_id=1`
   - **POST /products**: `{{baseUrl}}/products`
     - Headers: `Content-Type: application/json`, `Origin: https://inventorymanagement-hazel.vercel.app`
     - Body: `{"name":"New Product","price":49.99,"image":"https://example.com/image.jpg","category_id":2}`
   - **DELETE /products/1**: `{{baseUrl}}/products/1`
     - Headers: `Origin: https://inventorymanagement-hazel.vercel.app`
3. Set `baseUrl` variable to `https://inventory-backend-2spe.onrender.com` or `http://localhost:5000`.

## Deployment
- Deployed on Render: `https://inventory-backend-2spe.onrender.com`.
- Set environment variables in Render:
  ```env
  PORT=5000
  DB_HOST=<mysql_host>
  DB_USER=<mysql_user>
  DB_PASSWORD=<mysql_password>
  DB_NAME=inventory_db
  ```

## Troubleshooting
- **CORS Errors**: Ensure `cors` middleware allows `https://inventorymanagement-hazel.vercel.app` and `http://localhost:5173`. Test `OPTIONS` requests in Postman.
- **Database Issues**: Verify MySQL credentials and table schema.
- **API Errors**: Check Render logs and test endpoints with Postman.

## License
MIT License.