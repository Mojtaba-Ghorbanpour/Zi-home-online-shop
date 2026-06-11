// swagger/swagger.js
const path = require('node:path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Server API',
      version: '1.0.0',
      description: 'A comprehensive e-commerce API built with Node.js, Express, and MongoDB',
      contact: {
        name: 'Mojtaba Ghorbanpour',
        email: 'mojtabaghp81@gmail.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    // ⛔️ عمداً servers اینجا تعریف نمی‌کنیم؛ در /swagger.json داینامیک ست می‌شود
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        // --- User Schema ---
        User: {
          type: 'object',
          required: ['firstname', 'lastname', 'username', 'password', 'phoneNumber', 'address'],
          properties: {
            _id: { type: 'string', description: 'User ID' },
            firstname: { type: 'string', description: 'User first name' },
            lastname: { type: 'string', description: 'User last name' },
            username: { type: 'string', description: 'Unique username' },
            password: { type: 'string', minLength: 8, description: 'Password' },
            phoneNumber: { type: 'string', description: 'Unique phone number' },
            address: { type: 'string', description: 'User address' },
            role: { type: 'string', enum: ['ADMIN', 'USER'], default: 'USER' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },

        // --- Product Schema ---
        Product: {
          type: 'object',
          required: ['category', 'subcategory', 'name', 'price', 'brand', 'description'],
          properties: {
            _id: { type: 'string', description: 'Product ID' },
            category: { type: 'string', description: 'Category ObjectId' },
            subcategory: { type: 'string', description: 'Subcategory ObjectId' },
            name: { type: 'string', description: 'Product name (unique)' },
            slugname: { type: 'string', description: 'URL-friendly product name' },
            price: { type: 'number', description: 'Product price' },
            quantity: { type: 'number', default: 1 },
            brand: { type: 'string' },
            description: { type: 'string' },
            thumbnail: { type: 'string', default: 'products-thumbnails-default.jpeg' },
            images: {
              type: 'array',
              items: { type: 'string' },
              default: ['products-images-default.jpeg']
            },
            rating: {
              type: 'object',
              properties: {
                rate: { type: 'number', default: 0 },
                count: { type: 'number', default: 0 }
              }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },

        // --- Category Schema ---
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', description: 'Category name (unique)' },
            slugname: { type: 'string' },
            icon: { type: 'string', default: 'categories-icons-default.png' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },

        // --- Order Schema ---
        Order: {
          type: 'object',
          required: ['user', 'products'],
          properties: {
            _id: { type: 'string' },
            user: { type: 'string', description: 'User ObjectId' },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string', description: 'Product ObjectId' },
                  count: { type: 'number' }
                },
                required: ['product', 'count']
              }
            },
            totalPrice: { type: 'number', default: 0 },
            deliveryDate: { type: 'string', format: 'date-time' },
            deliveryStatus: { type: 'boolean', default: false },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },

        // --- Auth Schemas ---
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' }
          }
        },

        SignupRequest: {
          type: 'object',
          required: ['firstname', 'lastname', 'username', 'password', 'phoneNumber', 'address'],
          properties: {
            firstname: { type: 'string' },
            lastname: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string', minLength: 8 },
            phoneNumber: { type: 'string' },
            address: { type: 'string' }
          }
        },

        AuthResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Login successful' },
            data: {
              type: 'object',
              properties: {
                accessToken: { type: 'string' },
                refreshToken: { type: 'string' },
                user: { $ref: '#/components/schemas/User' }
              }
            }
          }
        },

        // --- Error Schema ---
        Error: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string' },
            error: { type: 'object' }
          }
        }
      }
    }
  },

  // مسیرها با __dirname تا وابسته به CWD نباشد
  apis: [
    path.join(__dirname, 'paths/*.js'),
    path.join(__dirname, 'paths/*.yml'),
    path.join(__dirname, 'paths/*.yaml'),
    path.join(__dirname, '../routers/*.js')
  ]
};

const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
