# Pro-Tasker - Task Management Application
...
cd ~/OneDrive/Desktop/2025-rtt-54/Pro-Tasker/pro-tasker-frontend

cat > README.md << 'EOF'
# Pro-Tasker - Task Management Application

A full-stack MERN (MongoDB, Express, React, Node.js) task management application that helps users organize their work through projects and tasks.

## 🚀 Live Application

**Frontend:** https://pro-tasker-frontend-lpxn.onrender.com
**Backend API:** https://pro-tasker-backend-1-b0pc.onrender.com

## 📋 Features

- **User Authentication:** Secure registration and login with JWT tokens
- **Project Management:** Create, view, and delete projects
- **Task Management:** Add, view, and delete tasks within projects
- **Protected Routes:** Authentication required for project/task access
- **Persistent Sessions:** Login state maintained across browser sessions

## 🛠️ Technologies Used

### Frontend
- React 18 with TypeScript
- React Router v6 for routing
- Axios for API requests
- Vite for build tooling
- Tailwind CSS for styling

### Backend
- Node.js & Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## 📁 Project Structure
```
pro-tasker-frontend/
├── src/
│   ├── clients/
│   │   └── api.ts                 # Axios configuration with interceptors
│   ├── components/
│   │   └── Navbar.tsx             # Navigation component
│   ├── context/
│   │   └── AuthProvider.tsx       # Global authentication state
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page
│   │   ├── AuthPage.tsx           # Login/Register forms
│   │   ├── ProjectsPage.tsx       # Project list and creation
│   │   └── ProjectDetailsPage.tsx # Task management
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.tsx                    # Main app with routing
│   └── main.tsx                   # Application entry point
├── .env                            # Environment variables
└── package.json                    # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory:
```
VITE_BACKEND_URL=http://localhost:4000/api
```

For production, use your deployed backend URL.

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. Password is hashed with bcrypt on the backend
3. User logs in with email and password
4. Backend validates credentials and returns JWT token
5. Token stored in localStorage on client
6. Axios interceptor adds token to all subsequent requests
7. Protected routes check for valid token before rendering

## 📡 API Integration

### API Client Configuration (`src/clients/api.ts`)

Axios instance with:
- Base URL from environment variable
- Request interceptor for automatic token injection
- Response interceptor for 401 error handling

### Authentication Context (`src/context/AuthProvider.tsx`)

Provides global authentication state:
- `user`: Current logged-in user object
- `token`: JWT authentication token
- `logIn()`: Login function
- `register()`: Registration function
- `logOut()`: Logout function (clears state and localStorage)

## 🛣️ Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | HomePage | Public | Landing page |
| `/auth` | AuthPage | Public | Login/Register |
| `/projects` | ProjectsPage | Protected | Project list |
| `/projects/:id` | ProjectDetailsPage | Protected | Task management |

Protected routes redirect unauthenticated users to `/auth`.

## 🎨 Styling

Built with Tailwind CSS utility classes for:
- Dark theme UI
- Responsive design
- Form styling
- Button states
- Layout components

## 🚀 Deployment

Deployed on **Render** as a Static Site:

1. Connect GitHub repository
2. Set build command: `npm install && npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_BACKEND_URL`
5. Deploy automatically on git push

## 🔗 Backend Repository

Backend code available at: https://github.com/equezada327/pro-tasker-backend

## 👤 Author

Enrique Quezada
- GitHub: [@equezada327](https://github.com/equezada327)

## 📝 License

This project was created as a capstone project for a software engineering bootcamp.
EOF