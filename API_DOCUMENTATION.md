# My Own CMS - API Documentation

## Overview
API REST complète pour gérer l'authentification et les projets d'un CMS personnel.

**Base URL:** `http://localhost:3000`

## Authentication

L'application utilise JWT (JSON Web Tokens) pour l'authentification. Après connexion, vous recevrez un token à inclure dans l'en-tête `Authorization` pour les routes protégées.

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Authentication (Authentification)

#### 1. Register (Créer un compte)
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Authentication:** ❌ Non requis
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (201 - Success):**
```json
{
  "id": "65a1b2c3d4e5f6g7h8i9j0",
  "email": "admin@example.com"
}
```

**Response (400 - Error):**
```json
{
  "error": "User already exists"
}
```

---

#### 2. Login (Se connecter)
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Authentication:** ❌ Non requis
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (200 - Success):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "email": "admin@example.com"
  }
}
```

**Response (400 - Error):**
```json
{
  "error": "Invalid credentials"
}
```

---

#### 3. Get Current User (Obtenir l'utilisateur courant)
- **Method:** `GET`
- **Endpoint:** `/auth/me`
- **Authentication:** ✅ Requis (JWT)
- **Content-Type:** `application/json`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200 - Success):**
```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "email": "admin@example.com"
  }
}
```

**Response (401 - Error):**
```json
{
  "error": "Unauthorized"
}
```

---

### Projects (Projets)

#### 1. Create Project (Créer un projet)
- **Method:** `POST`
- **Endpoint:** `/projects`
- **Authentication:** ✅ Requis (JWT)
- **Content-Type:** `application/json`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My Awesome Project",
  "category": "Web Design",
  "image": "https://example.com/image.jpg",
  "year": "2024",
  "description": "A brief description of the project",
  "client": "Acme Corp",
  "software": ["Figma", "Adobe XD", "Photoshop"],
  "longDescription": "A detailed description of the project including all aspects",
  "additionalImages": [
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  "process": "Detailed explanation of the design process and approach",
  "videoUrl": "https://youtube.com/watch?v=video"
}
```

**Required Fields:**
- `title` (string)
- `category` (string)
- `image` (string)
- `year` (string)
- `description` (string)

**Optional Fields:**
- `client` (string)
- `software` (array of strings)
- `longDescription` (string)
- `additionalImages` (array of strings)
- `process` (string)
- `videoUrl` (string)

**Response (201 - Success):**
```json
{
  "success": true,
  "project": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "title": "My Awesome Project",
    "category": "Web Design",
    "year": "2024",
    "createdAt": "2024-01-14T10:30:00.000Z"
  }
}
```

**Response (400 - Error):**
```json
{
  "error": "Missing required fields",
  "required": ["title", "category", "image", "year", "description"]
}
```

---

#### 2. Get All Projects (Obtenir tous les projets)
- **Method:** `GET`
- **Endpoint:** `/projects`
- **Authentication:** ❌ Non requis
- **Content-Type:** `application/json`

**Response (200 - Success):**
```json
{
  "success": true,
  "count": 2,
  "projects": [
    {
      "id": "65a1b2c3d4e5f6g7h8i9j0",
      "title": "My Awesome Project",
      "category": "Web Design",
      "image": "https://example.com/image.jpg",
      "year": "2024",
      "description": "A brief description of the project",
      "client": "Acme Corp",
      "software": ["Figma", "Adobe XD"],
      "createdAt": "2024-01-14T10:30:00.000Z",
      "updatedAt": "2024-01-14T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. Get Project by ID (Obtenir un projet spécifique)
- **Method:** `GET`
- **Endpoint:** `/projects/:id`
- **Authentication:** ❌ Non requis
- **Content-Type:** `application/json`

**URL Parameters:**
- `id` (string) - MongoDB project ID

**Example URL:** `http://localhost:3000/projects/65a1b2c3d4e5f6g7h8i9j0`

**Response (200 - Success):**
```json
{
  "success": true,
  "project": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "title": "My Awesome Project",
    "category": "Web Design",
    "image": "https://example.com/image.jpg",
    "year": "2024",
    "description": "A brief description of the project",
    "client": "Acme Corp",
    "software": ["Figma", "Adobe XD", "Photoshop"],
    "longDescription": "A detailed description of the project",
    "additionalImages": ["https://example.com/image2.jpg"],
    "process": "Design process explanation",
    "videoUrl": "https://youtube.com/watch?v=video",
    "createdAt": "2024-01-14T10:30:00.000Z",
    "updatedAt": "2024-01-14T10:30:00.000Z"
  }
}
```

**Response (404 - Not Found):**
```json
{
  "error": "Project not found",
  "id": "65a1b2c3d4e5f6g7h8i9j0"
}
```

---

#### 4. Update Project (Mettre à jour un projet)
- **Method:** `PUT`
- **Endpoint:** `/projects/:id`
- **Authentication:** ✅ Requis (JWT)
- **Content-Type:** `application/json`

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**URL Parameters:**
- `id` (string) - MongoDB project ID

**Request Body (tous les champs sont optionnels):**
```json
{
  "title": "Updated Project Title",
  "description": "Updated description",
  "year": "2025",
  "software": ["Figma", "Adobe XD", "Photoshop"],
  "client": "New Client"
}
```

**Response (200 - Success):**
```json
{
  "success": true,
  "project": {
    "id": "65a1b2c3d4e5f6g7h8i9j0",
    "title": "Updated Project Title",
    "category": "Web Design",
    "image": "https://example.com/image.jpg",
    "year": "2025",
    "description": "Updated description",
    "client": "New Client",
    "software": ["Figma", "Adobe XD", "Photoshop"],
    "createdAt": "2024-01-14T10:30:00.000Z",
    "updatedAt": "2024-01-14T11:45:00.000Z"
  }
}
```

**Response (404 - Not Found):**
```json
{
  "error": "Project not found",
  "id": "65a1b2c3d4e5f6g7h8i9j0"
}
```

---

#### 5. Delete Project (Supprimer un projet)
- **Method:** `DELETE`
- **Endpoint:** `/projects/:id`
- **Authentication:** ✅ Requis (JWT)
- **Content-Type:** `application/json`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
- `id` (string) - MongoDB project ID

**Example URL:** `http://localhost:3000/projects/65a1b2c3d4e5f6g7h8i9j0`

**Response (200 - Success):**
```json
{
  "success": true,
  "message": "Project \"My Awesome Project\" has been deleted"
}
```

**Response (404 - Not Found):**
```json
{
  "error": "Project not found",
  "id": "65a1b2c3d4e5f6g7h8i9j0"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or missing required fields |
| 401 | Unauthorized - Missing or invalid JWT token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Error Handling

Toutes les erreurs sont retournées au format JSON avec un message descriptif:

```json
{
  "error": "Error message",
  "message": "Additional details (optional)"
}
```

---

## How to Use

### 1. Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### 3. Create Project (with JWT)
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title":"My Project",
    "category":"Web Design",
    "image":"https://example.com/image.jpg",
    "year":"2024",
    "description":"Project description"
  }'
```

### 4. Get All Projects
```bash
curl -X GET http://localhost:3000/projects
```

---

## Import in Postman

1. Télécharger le fichier `postman_collection.json`
2. Ouvrir Postman
3. Cliquer sur **Import**
4. Sélectionner le fichier téléchargé
5. Après login, copier le token JWT et le coller dans la variable `jwt_token`

---

## Environment Variables

Assurez-vous que les variables d'environnement suivantes sont configurées:

```
PORT=3000
JWT_SECRET=your_secret_key
MONGODB_URI=mongodb://...
```

