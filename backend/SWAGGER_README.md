# Maktab90 Server API Documentation

This project now includes comprehensive API documentation using Swagger/OpenAPI 3.0.

## 📚 API Documentation

### Accessing the Documentation

Once your server is running, you can access the interactive API documentation at:

```
http://localhost:8000/api-docs
```

Replace `localhost:3000` with your actual host and port if different.

### Features

- **Interactive API Explorer**: Test API endpoints directly from the documentation
- **Authentication Support**: JWT Bearer token authentication integrated
- **Complete Schema Definitions**: All request/response models documented
- **Example Requests**: Pre-filled examples for easy testing
- **Organized by Tags**: Endpoints grouped by functionality (Auth, Users, Products, etc.)

## 🚀 API Endpoints Overview

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/logout` - User logout (requires auth)
- `POST /api/auth/token` - Refresh access token

### Users (Admin only)

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products

- `GET /api/products` - Get all products (with pagination & filters)
- `POST /api/products` - Create product (Admin only, supports file upload)
- `GET /api/products/:id` - Get product by ID
- `PATCH /api/products/:id` - Update product (supports file upload)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (supports icon upload)
- `GET /api/categories/:id` - Get category by ID
- `PATCH /api/categories/:id` - Update category (supports icon upload)
- `DELETE /api/categories/:id` - Delete category

### Subcategories

- `GET /api/subcategories` - Get all subcategories (with category filter)
- `POST /api/subcategories` - Create subcategory
- `GET /api/subcategories/:id` - Get subcategory by ID
- `PATCH /api/subcategories/:id` - Update subcategory
- `DELETE /api/subcategories/:id` - Delete subcategory

### Orders

- `GET /api/orders` - Get all orders (with pagination & filters)
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. **Login/Signup** to get access and refresh tokens
2. **Use the "Authorize" button** in Swagger UI to set your Bearer token
3. **Or manually add** `Authorization: Bearer <your-token>` header to requests

### Token Types

- **Access Token**: Short-lived, used for API requests
- **Refresh Token**: Long-lived, used to generate new access tokens

## 📝 Data Models

### User

- `firstname`, `lastname`: User's name
- `username`: Unique identifier for login
- `password`: Min 8 chars, must contain letters & numbers
- `phoneNumber`: Unique phone number
- `address`: User's address
- `role`: Either 'USER' or 'ADMIN'

### Product

- `name`: Unique product name
- `price`: Product price (number)
- `quantity`: Available quantity
- `brand`: Product brand
- `description`: Product description
- `category`, `subcategory`: References to Category/Subcategory
- `thumbnail`, `images`: Product images (file uploads)
- `rating`: Object with rate and count

### Category

- `name`: Unique category name
- `slugname`: Auto-generated URL-friendly name
- `icon`: Category icon image (file upload)

### Order

- `user`: Reference to User
- `products`: Array of {product, count} objects
- `totalPrice`: Auto-calculated total
- `deliveryDate`: Expected delivery (defaults to tomorrow)
- `deliveryStatus`: Boolean delivery status

## 🛠️ File Uploads

Several endpoints support file uploads:

- **Products**: `thumbnail` (single) and `images` (multiple)
- **Categories**: `icon` (single)

Use `multipart/form-data` content type for these endpoints.

## 🔍 Query Parameters

### Pagination (Products, Users, Orders)

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

### Filters

- **Products**: `category`, `search`
- **Users**: `role`
- **Orders**: `user`, `deliveryStatus`
- **Subcategories**: `category`

## 📋 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "status": "success",
  "data": { ... }
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Error description",
  "error": { ... }
}
```

## 🚨 Error Codes

- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `409`: Conflict - Duplicate data (username, email, etc.)
- `500`: Internal Server Error

## 🧪 Testing the API

### Using Swagger UI

1. Open `http://localhost:3000/api-docs`
2. Click on any endpoint to expand
3. Click "Try it out"
4. Fill in parameters and request body
5. Click "Execute" to test

### Authentication in Swagger

1. Click the "Authorize" button (🔒 icon)
2. Enter `Bearer <your-jwt-token>`
3. Click "Authorize"
4. Now all requests will include the auth header

### Using cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'

# Use the returned token for authenticated requests
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 📂 Project Structure

```
swagger/
├── swagger.js              # Main Swagger configuration
└── paths/
    ├── auth.js             # Authentication endpoints
    ├── users.js            # User management endpoints
    ├── products.js         # Product endpoints
    ├── categories.js       # Category endpoints
    ├── subcategories.js    # Subcategory endpoints
    └── orders.js           # Order endpoints
```

## 🔧 Customization

To modify the API documentation:

1. **Update schemas** in `swagger/swagger.js`
2. **Modify endpoint docs** in `swagger/paths/*.js`
3. **Server info** can be updated in the main config
4. **UI customization** is in `app.js` Swagger setup

The documentation is automatically generated from the code annotations, so it stays in sync with your API changes.

## 📞 Support

If you encounter any issues with the API or documentation, please check the server logs or contact the development team.

---

**Happy coding! 🚀**
