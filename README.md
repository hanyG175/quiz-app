# A University Club Quiz Application

A web application for the Club's annual competition. This interactive platform allows students to register, take quizzes in various scientific categories, view their scores, and compete on a leaderboard.


| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/8c458503-ec95-4a9d-8320-cbd9f12b8a3b" alt="image" /> | <img src="https://github.com/user-attachments/assets/d07a65d9-9687-4dec-b54c-bbf79b8af467" alt="Screenshot 2026-11-19 152600" /> | <img src="https://github.com/user-attachments/assets/bd617119-70cb-4397-906d-76be4d1a97ca" alt="Screenshot 2026-11-19 152714" /> |

## 🌟 Features

### User Features
- **User Registration & Authentication**: Students can sign up to participate in the challenge
- **Dynamic Quiz System**: Take quizzes in multiple categories (Science, History/Geography, Languages) and subcategories
- **Real-time Quiz Experience**: Each question has a 20-second timer
- **Personalized Results**: View your score immediately after completion
- **Leaderboard**: For managers to check the rankings.
- **Responsive Design**: Works seamlessly on desktop and "mostly" mobile devices

### Admin Features
- **Secure Admin Panel**: Manage the entire competition from an intuitive dashboard
- **User Management**: View and manage all registered participants
- **Quiz Monitoring**: Track active and completed quizzes
- **Performance Analytics**: View average scores and completion statistics
- **Leaderboard Management**: Filter and export participant scores as CSV

## 🛠️ Technology Stack

- **Frontend**: React.js with React Router
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Hooks and Context API
- **Authentication**: JWT token-based authentication
- **Animation**: Custom CSS animations
- **Icons**: Lucide React icons

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: CORS, Express Validator, Helmet
- **Development Tools**: Nodemon for hot-reloading

---

## 📋 Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

---



## 🚀 Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/science-creativity-club.git
   cd science-creativity-club

2. **Frontend Setup**:
   ```
   cd client
   npm install
   
3. **Backend Setup**:
   ```
   cd ../server
   npm install
   
4. **Environment Configuration:**
   Create `.env` file in `/server` directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/quiz_app
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1h
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD_SECRET=your_admin_password_secret
Replace values with your actual credentials

5. **Ensure MongoDB service is running**
   
--- 

## 🔥 Running the Application
In separate terminal tabs:

1. **Start Backend:**
   ```
   cd server
   npm run dev  # Uses nodemon for live reload
3. **Start Frontend:**
   ```
   cd client
   npm start
Access the app at http://localhost:3000 and API at http://localhost:5000

--- 

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See LICENSE for more information.

## 🙏 Acknowledgements
1. MongoDB for flexible document-based storage
2. Express.js team for robust backend framework
3. React community for comprehensive documentation

