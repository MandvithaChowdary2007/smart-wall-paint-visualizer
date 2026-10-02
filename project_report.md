# Smart Wall Paint Visualizer

## 1. Project Title

Smart Wall Paint Visualizer

## 2. Project Overview

Smart Wall Paint Visualizer is a full-stack web application that allows users to visualize different paint colours on their room walls before actually painting them.

The application provides an interactive platform where users can upload a room image, select wall areas using polygon or brush tools, apply different colours, compare before and after results, and save their visualization project.

The project combines e-commerce features with interactive room visualization to make paint selection easier and more convenient.

---

## 3. Problem Statement

Choosing a suitable wall colour from physical paint cards or showroom samples can be difficult because users cannot easily understand how the colour will look in their own room.

Users need a simple digital solution that allows them to preview different colours directly on a photograph of their room.

Smart Wall Paint Visualizer solves this problem by providing an interactive room painting preview system.

---

## 4. Objectives

The main objectives of the project are:

- Allow users to upload room photographs.
- Provide polygon-based wall selection.
- Provide brush-based wall selection.
- Allow users to select HEX/RGB colours.
- Provide predefined colour swatches.
- Preview different colours on selected wall areas.
- Provide Undo and Redo functionality.
- Provide Reset functionality.
- Compare Before and After views.
- Allow users to save visualization projects.
- Provide user authentication.
- Store project information using MongoDB.
- Provide an attractive and responsive user interface.

---

## 5. Technologies Used

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- Angular Forms
- Angular HTTP Client
- Canvas API

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

### Database

- MongoDB Atlas
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- Google Chrome

---

## 6. System Architecture

The application follows a MEAN stack architecture.

User
↓
Angular Frontend
↓
Express.js REST API
↓
Node.js Backend
↓
MongoDB Atlas

The Angular frontend communicates with the Node.js and Express backend through REST API endpoints.

MongoDB Atlas stores user accounts, project information, wall coordinates and visualization data.

---

## 7. Main Features

### 7.1 User Authentication

The application provides registration and login functionality.

JWT authentication is used to securely manage authenticated users.

Users can access protected features after successful authentication.

---

### 7.2 Room Image Upload

Users can upload a room photograph in JPG or PNG format.

The uploaded image is displayed inside an HTML Canvas.

The application also checks the image size before processing it.

---

### 7.3 Polygon Wall Selection

The Polygon tool allows users to select a wall by clicking multiple points around the wall.

The selected points are connected to form a polygon.

The selected area can then be filled with the chosen paint colour.

---

### 7.4 Brush Tool

The Brush tool allows users to select an area by clicking and dragging over the room image.

Brush strokes are stored as coordinates and can be used for colour visualization.

---

### 7.5 Colour Selection

Users can enter a custom HEX colour.

Example:

#C85C3A

The application also provides predefined colour swatches.

Colour categories can include:

- Warm
- Cool
- Neutral
- Earthy
- Bold
- Pastel
- Luxury

---

### 7.6 Undo and Redo

The application maintains visualization states so users can undo previous selections and restore them using Redo.

---

### 7.7 Reset

The Reset option clears the selected wall areas and brush strokes and returns the visualizer to its initial state.

---

### 7.8 Before and After Comparison

Users can switch between the original room image and the colour visualization.

This allows users to compare the room before and after applying a paint colour.

---

### 7.9 Save Project

Authenticated users can save their visualization project.

The project can contain:

- Project name
- Wall coordinates
- Brush strokes
- Selected colour
- User information

Project information is stored in MongoDB Atlas.

---

## 8. User Interface Design

The project uses a Neo-Brutalism inspired interface.

Important UI characteristics include:

- Bold typography
- Strong borders
- Offset shadows
- High-contrast elements
- Colour accents
- Clear spacing
- Responsive layouts
- Interactive buttons
- Visual feedback

The interface is designed for desktop, tablet and mobile screen sizes.

---

## 9. User Workflow

The main user journey is:

1. Register/Login
2. Upload Room Image
3. Select Polygon or Brush
4. Select Wall Area
5. Choose Paint Colour
6. Preview Colour
7. Compare Before/After
8. Undo/Redo if required
9. Save Project

---

## 10. Database

MongoDB Atlas is used as the cloud database.

The database can store:

### Users

- Name
- Email
- Password hash
- Role

### Projects

- User ID
- Project name
- Wall coordinates
- Brush strokes
- Selected colours
- Created date

### Colours / Products

- Colour name
- HEX value
- Category
- Finish
- Coverage
- Price
- Rating

---

## 11. Security

The application uses JWT-based authentication.

Passwords are protected using password hashing.

Protected API routes require valid authentication.

Environment variables are used for sensitive configuration such as:

- MongoDB connection string
- JWT secret
- Server configuration

Sensitive credentials are not stored directly in the source code.

---

## 12. API Structure

Example API operations include:

### Authentication

POST /api/auth/register

POST /api/auth/login

### Projects

GET /api/projects

POST /api/projects

GET /api/projects/:id

PUT /api/projects/:id

DELETE /api/projects/:id

### Colours

GET /api/colors

POST /api/colors

---

## 13. Advantages

- Easy visualization of wall colours.
- Reduces uncertainty when selecting colours.
- Interactive room preview.
- Supports custom colours.
- Easy wall selection.
- Before/After comparison.
- Projects can be saved.
- Cloud database support.
- Responsive user interface.
- Combines visualization with e-commerce functionality.

---

## 14. Future Enhancements

Future versions can include:

- AI-based automatic wall detection.
- More accurate wall segmentation.
- Realistic lighting and shadows.
- 3D room visualization.
- Paint product purchasing.
- Shopping cart and wishlist.
- Payment gateway integration.
- Advanced paint calculator.
- More room inspiration designs.
- Admin analytics dashboard.
- Mobile application.
- AR-based room colour visualization.

---

## 15. Project Outcome

The Smart Wall Paint Visualizer provides an interactive solution for previewing wall colours using real room photographs.

The application demonstrates the integration of Angular, Node.js, Express.js, MongoDB Atlas, authentication and Canvas-based visualization into a complete full-stack web application.

---

## 16. Deployment

Frontend:
[Add deployed frontend URL here]

Backend:
[Add deployed backend URL here]

Database:
MongoDB Atlas

---

## 17. GitHub Repository

[Add GitHub repository URL here]

---

## 18. Conclusion

Smart Wall Paint Visualizer demonstrates how modern web technologies can be used to solve a practical paint-selection problem.

By allowing users to upload their room image, select wall areas and preview different colours, the application provides a convenient digital alternative to traditional paint selection methods.

The project also demonstrates full-stack development using the MEAN stack along with authentication, database integration and interactive canvas-based visualization.
