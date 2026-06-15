# 🎉 EventEase

**EventEase** is a full-stack web application built for event management in academic institutions. It streamlines event organization, registration, feedback collection, and communication between students and admins.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Spring Boot (Java)
- **Database:** MySQL (via Docker, phpMyAdmin)
- **Authentication:** Basic Auth
- **Email Notifications:** Spring Mail + SMTP
- **Charts & Visualization:** Chart.js
- **Version Control:** Git & GitHub

---

## 🚀 Features

### ✅ General Features
- User-friendly UI with **Dark/Light Mode toggle**
- Secure login & registration
- Admin and Student roles

### 🗓️ Event Management
- **CRUD Operations** for events (Admins)
- Event registration by students
- Auto email on registration approval

### 💬 Comment & Discussion
- Comment section under each event
- Real-time feedback from students
- Admin announcements

### 📊 Feedback System
- Feedback form sent via email after event
- Feedback analysis displayed as **bar charts**
- Helps improve event quality and engagement

### 📬 Email Features
- Email notification for registration approvals
- Feedback form links sent directly to users' inboxes  
> ⚠️ **Note:** Since the app runs on `localhost`, feedback form links will only work on the same device where the backend is running.

## 📁 Project Structure
EventEase/
│
├── backend/ # Spring Boot app (REST APIs)
│ ├── src/
│ └── pom.xml
│
├── frontend/ # React app (UI)
│ ├── src/
│ └── package.json
│
└── README.md # You're reading it!

## 🔧 Setup Instructions

### 🐳 MySQL via Docker

```bash
docker run -d -p 3306:3306 --name mysql-db \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  -e MYSQL_DATABASE=eventease \
  mysql

📦 Backend
bash
cd backend
# Open in IntelliJ / any Java IDE
# Run Spring Boot app

💻 Frontend
bash
cd frontend
npm install
npm start
React runs on http://localhost:3000, Spring Boot on http://localhost:8081.

☁️ AWS Deployment

EventEase is deployed using AWS cloud services to simulate a production-grade full-stack architecture.

🌐 Live Architecture
Frontend (React)
   ↓
AWS S3 (Static Website Hosting)

Backend (Spring Boot)
   ↓
AWS EC2 Instance

Database (MySQL)
   ↓
Hosted on EC2 / Docker Container

🚀 Frontend Deployment (AWS S3)
React application is built using:
npm run build
Production build is hosted on AWS S3 Static Website Hosting

📌 Steps followed:
Created S3 bucket
Enabled static website hosting
Uploaded React build/ contents
Configured bucket policy for public access

🌍 Live Frontend URL:
http://eventease-frontend-xyz.s3-website-us-east-1.amazonaws.com/

⚙️ Backend Deployment (AWS EC2)
Spring Boot backend is deployed on an AWS EC2 Linux instance
Application runs on port 8081

📌 Steps followed:
Installed Java on EC2
Uploaded backend JAR file
Configured security group to allow port 8081
Started application using:
java -jar backend.jar

🌍 Backend Base URL:
http://<100.53.32.83>:8081

🔗 Frontend–Backend Integration
React frontend communicates with Spring Boot backend via REST APIs
CORS is enabled in backend to allow cross-origin requests from S3 hosted frontend
@CrossOrigin(origins = "*")

🔐 Security Considerations
EC2 security groups configured to expose only required ports:
8081 (Backend API)
22 (SSH access)
S3 bucket configured with public read access for static hosting only

💡 Why AWS Deployment?
Demonstrates real-world cloud deployment skills
Separates frontend and backend (microservice-style architecture)
Scalable and production-ready setup
Aligns with industry DevOps practices

📈 Future Improvements
Add custom domain using Route 53
Enable HTTPS using AWS CloudFront + ACM
CI/CD pipeline using GitHub Actions
Move database to AWS RDS for scalability

🙌 Acknowledgements
Built with 💙 using open-source tools, guided by educational passion and teamwork.

📜 License
This project is licensed under the MIT License.





