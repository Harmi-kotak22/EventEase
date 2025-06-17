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

🙌 Acknowledgements
Built with 💙 using open-source tools, guided by educational passion and teamwork.

📜 License
This project is licensed under the MIT License.





