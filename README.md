# Hyundai Sales Management System

## Table of Contents

- [Overview](#-overview)  
- [Features](#-features)  
- [Tech Stack](#️-tech-stack)  
- [Project Structure](#-project-structure)  
- [Getting Started](#-getting-started)  
  - [Prerequisites](#-prerequisites)  
  - [Installation](#-installation)  
  - [Running the Project](#-running-the-project)  
- [API Documentation](#-api-documentation)  
- [Development & Testing](#-development--testing)  
- [Deployment](#-deployment)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Contact](#-contact)  
- [Live Demo](#-live-demo)  
---

## 📖 Overview  

**Hyundai Sales Management System** is a modern and scalable web application designed to **streamline vehicle sales and after-sales processes**. This system enables **dealerships** to efficiently manage clients, vehicles, sales transactions, and maintenance services.  

The project is **containerized using Docker** and deploy using **Kubernetes**.  

![Overview](/docs/images/overview.png)

---

## ✨ Features  

✅ **Client Management** – Add, update, and manage customer information.  
✅ **Vehicle Inventory** – Track and manage vehicles.  
✅ **Sales Transactions** – Process and monitor sales.  
✅ **After-Sales Service** – Handle maintenance requests and repairs.  
✅ **Role-Based Access Control (RBAC)** – Admin, Sales, and Service roles.  
✅ **Modern UI/UX** – Built with **Next.js**, **Tailwind CSS**, and **Material UI**.  
✅ **REST API** – Powered by **Spring Boot** with **MySQL database**.  

---

## 🛠️ Tech Stack  

| Layer            | Technology Stack                                |
|-----------------|------------------------------------------------|
| **Frontend**    | Next.js, TypeScript, Tailwind CSS, Material UI |
| **Backend**     | Spring Boot, MySQL, JPA, Spring Security      |
| **API**         | REST API with OpenAPI Documentation           |
| **Containerization** | Docker, Docker Compose                    |
| **Orchestration** | Docker Swarm                                 |
| **Version Control** | Git, GitHub                               |

---

## 📂 Project Structure  

```
hyundai-sales/
│── backend/         # Spring Boot Backend
│   ├── src/        # Application source code
│   ├── pom.xml     # Maven dependencies
│   ├── Dockerfile  # Backend Docker configuration
│
│── frontend/        # Next.js Frontend
│   ├── src/        # Frontend source code
│   ├── package.json # Node.js dependencies
│   ├── Dockerfile  # Frontend Docker configuration
│
│── docker/          # Docker Setup
│   ├── compose.yml  # Main Docker Compose file
│   ├── compose.dev.yml  # Development Docker config
│   ├── compose.prod.yml # Production Docker config
│   ├── init.sql     # Database initialization script
│
│── docs/            # Documentation files
│── LICENSE          # License file
│── README.md        # Project documentation
```

---

## 🚀 Getting Started  

### 🔧 Prerequisites  

Ensure you have the following installed:  

- **Node.js** (for frontend)  
- **Java 21** (for backend)  
- **Docker & Docker Compose**  
- **MySQL**  

---

### 📥 Installation  

Clone the repository:

```sh
git clone https://github.com/marouanedbibih/hyundai-sales.git
cd hyundai-sales
```

---

### 🔄 Running the Project  

#### 🚀 Run with Docker (Recommended)  

```sh
cd docker
docker compose -f compose.yml -f compose.dev.yml up --build
```

#### 🖥️ Run Backend (Standalone)  

```sh
cd backend
./mvnw install
./mvnw spring-boot:run
```

#### 🌐 Run Frontend (Standalone)  

```sh
cd frontend
npm install
npm run dev
```

---


## 🖥️ API Documentation  

The backend exposes a **REST API** for frontend interaction.  

| Method | Endpoint                        | Description               |
|--------|---------------------------------|---------------------------|
| `POST` | `/api/v1/login`                | User login                |
| `GET`  | `/api/v1/users`                | Fetch all users           |
| `GET`  | `/api/v1/clients`              | Fetch all clients         |
| `GET`  | `/api/v1/vehicles`             | Fetch all vehicles        |
| `GET`  | `/api/v1/sales`                | Fetch all sales           |
| `GET`  | `/api/v1/after-sales`          | Fetch after-sales records |

> **Complete API docs** are available via Swagger at:  
> **`http://api.hyundai-sales.marouanedbibih.engineer/swagger-ui.html`**

---

## 🛠️ Development & Testing  

### ✅ Running Backend Tests  

```sh
cd backend
./mvnw test
```

### ✅ Running Frontend Tests  

```sh
cd frontend
npm test
```

---

## 📌 Deployment  

For **production deployment**, use:  

```sh
docker compose -f compose.yml -f compose.prod.yml up --build -d
```

For **Docker Swarm**, use:
```sh
docker stack deploy -c compose.yml -c compose.prod.yml hyundai-sales
```

The application will be available at:  

- **Frontend**: [http://hyundai-sales.marouanedbibih.engineer](http://hyundai-sales.marouanedbibih.engineer)  
- **Backend API**: [http://api.hyundai-sales.marouanedbibih.engineer](http://api.hyundai-sales.marouanedbibih.engineer)
- **Username:** admin
- **Password:** password



---

## 🤝 Contributing  

1. **Fork the Repository**  
2. **Create a Feature Branch**  
   ```sh
   git checkout -b feature/your-feature
   ```
3. **Commit Your Changes**  
   ```sh
   git commit -m "Add feature description"
   ```
4. **Push to the Branch**  
   ```sh
   git push origin feature/your-feature
   ```
5. **Submit a Pull Request**  

---

## 📝 License  

This project is **open-source** under the **MIT License**.  

---

## 📞 Contact  

For any inquiries, reach out to:  

📧 **Marouane Dbibih** – [m.dbibih@gmail.com](mailto:m.dbibih@gmail.com)  

🌍 **Live Demo**  
🚀 [Hyundai Sales Management System](http://hyundai-sales.marouanedbibih.engineer)

---