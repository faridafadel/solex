# Solex Backend

Milestone 3 adds a separate Express + MongoDB backend for the Solex storefront.

## Features

- JWT authentication with register, login, and current-user endpoints
- MongoDB models for `User`, `Product`, and `Review`
- REST API for product listing, product CRUD, and review management
- Request logging plus centralized not-found and error middleware

## API Endpoints

### Health
- `GET /api/health`

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)
- `PATCH /api/auth/profile` (protected)

### Cart
- `GET /api/cart` (protected)
- `POST /api/cart/items` (protected)
- `PATCH /api/cart/items/:productId` (protected)
- `DELETE /api/cart/items/:productId` (protected)
- `DELETE /api/cart` (protected)

### Contact
- `POST /api/contact`

### Products
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/products` (protected)
- `PATCH /api/products/:id` (protected)
- `DELETE /api/products/:id` (protected)

### Reviews
- `GET /api/reviews`
- `POST /api/reviews` (protected)
- `DELETE /api/reviews/:id` (protected)

### Orders
- `GET /api/orders` (protected)
- `GET /api/orders/:id` (protected)
- `POST /api/orders` (protected)
- `PATCH /api/orders/:id/cancel` (protected)

Protected endpoints require:

```http
Authorization: Bearer <jwt-token>
```

The registration and login endpoints return a token that must be included in this header for all protected requests.

## Example Request Bodies

### Authentication

Register:

```json
{
  "fullName": "Solex Member",
  "email": "member@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Login:

```json
{
  "email": "member@example.com",
  "password": "password123"
}
```

Update profile:

```json
{
  "fullName": "Updated Name",
  "phone": "+201234567890",
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

### Products

Create product:

```json
{
  "name": "Solex Air Max 1",
  "slug": "solex-air-max-1",
  "sku": "SLX-SOLEX-AIR-MAX-1",
  "category": "Running",
  "description": "Classic low-profile runner with durable traction and smooth ride.",
  "price": 24900,
  "sizes": ["39", "40", "41"],
  "color": "Blue",
  "gender": "Men",
  "popular": true
}
```

### Reviews

Create review:

```json
{
  "productId": "replace-with-product-id",
  "rating": 5,
  "title": "Great quality",
  "comment": "Comfortable and exactly as described."
}
```

### Cart

Add to cart:

```json
{
  "productId": "replace-with-product-id",
  "quantity": 2,
  "size": "41"
}
```

Update cart item:

```json
{
  "quantity": 3,
  "size": "42"
}
```

### Addresses

Create address:

```json
{
  "fullName": "Solex Member",
  "phone": "+201234567890",
  "street": "12 Nile Street",
  "city": "Cairo",
  "isDefault": true
}
```

### Orders

Create order:

```json
{
  "items": [
    {
      "productId": "replace-with-product-id",
      "quantity": 2,
      "size": "41"
    }
  ],
  "shippingAddress": {
    "fullName": "Solex Member",
    "phone": "+201234567890",
    "street": "12 Nile Street",
    "city": "Cairo"
  },
  "paymentMethod": "cash"
}
```

### Contact

Send message:

```json
{
  "name": "Solex Member",
  "email": "member@example.com",
  "subject": "Order inquiry",
  "message": "I have a question about my recent order."
}
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier)

## Setup

1. Create a free **M0 Sandbox** cluster on MongoDB Atlas
2. In Atlas, go to **Database Access** and create a database user with password
3. Go to **Network Access** and add `0.0.0.0/0` (allow from anywhere)
4. Click **Connect** on your cluster → **Connect your application** → copy the connection string
5. Copy `.env.example` to `.env`
6. Replace the `MONGODB_URI` in `.env` with your Atlas connection string (sub in your password)
7. Install dependencies with `npm install`
8. Seed the database with starter products: `npm run seed`
9. (Optional) Seed full demo data including user, reviews, cart, orders, addresses, and contacts: `npm run seed:all`
10. Start the API with `npm run dev`

## MongoDB Atlas

The backend already uses Mongoose, so MongoDB Atlas works by setting `MONGODB_URI`
to the connection string from your Atlas cluster.

1. In Atlas, create a database user and allow your current IP address in
   **Network Access**.
2. Click **Connect** on the cluster, choose **Drivers**, and copy the
   `mongodb+srv://...` connection string.
3. Paste it into `server/.env` as `MONGODB_URI`, replacing `<password>` and
   keeping `/solex` as the database name:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/solex?retryWrites=true&w=majority&appName=Solex
```

The API logs only the connected database name and host, not the full URI.

## Example Request Bodies

Register:

```json
{
  "fullName": "Solex Member",
  "email": "member@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Create product:

```json
{
  "name": "Solex Air Max 1",
  "slug": "solex-air-max-1",
  "sku": "SLX-SOLEX-AIR-MAX-1",
  "category": "Running",
  "description": "Classic low-profile runner with durable traction and smooth ride.",
  "price": 24900,
  "sizes": ["39", "40", "41"],
  "color": "Blue",
  "gender": "Men",
  "popular": true
}
```

Create review:

```json
{
  "productId": "replace-with-product-id",
  "rating": 5,
  "title": "Great quality",
  "comment": "Comfortable and exactly as described."
}
```

Create address:

```json
{
  "fullName": "Solex Member",
  "phone": "+201234567890",
  "street": "12 Nile Street",
  "city": "Cairo",
  "isDefault": true
}
```

Create order:

```json
{
  "items": [
    {
      "productId": "replace-with-product-id",
      "quantity": 2,
      "size": "41"
    }
  ],
  "shippingAddress": {
    "fullName": "Solex Member",
    "phone": "+201234567890",
    "street": "12 Nile Street",
    "city": "Cairo"
  },
  "paymentMethod": "cash"
}
```
