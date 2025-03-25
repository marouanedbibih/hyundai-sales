# Hyundai Sales Management System  

## Table of Contents  
1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Project Structure](#project-structure)  
5. [Getting Started](#getting-started)  
    - [Prerequisites](#prerequisites)  
    - [Installation](#installation)  
6. [Running the Project](#running-the-project)  
    - [Run Backend (Standalone)](#run-backend-standalone)  
    - [Run Frontend (Standalone)](#run-frontend-standalone)  
7. [Docker Documentation](#docker-documentation)  
8. [Kubernetes Deployment](#kubernetes-deployment)  
9. [API Documentation](#api-documentation)  
10. [Contributing](#contributing)  
11. [License](#license)  
12. [Contact](#contact)  

---

## Overview  

**Hyundai Sales Management System** is a modern and scalable web application designed to **streamline vehicle sales and after-sales processes**. This system enables **dealerships** to efficiently manage clients, vehicles, sales transactions, and maintenance services.  

![Overview](/docs/images/overview.png)  

---

## Features  

- **Client Management** – Add, update, and manage customer information.  
- **Vehicle Inventory** – Track and manage vehicles.  
- **Sales Transactions** – Process and monitor sales.  
- **After-Sales Service** – Handle maintenance requests and repairs.  
- **Role-Based Access Control (RBAC)** – Admin, Sales, and Service roles.  

---

## Tech Stack  

| **Layer**          | **Technology Stack**                              |  
|--------------------|--------------------------------------------------|  
| **Frontend**       | Next.js, TypeScript, Tailwind CSS, Material UI    |  
| **Backend**        | Spring Boot, MySQL, JPA, Spring Security          |  
| **API**            | REST API with OpenAPI Documentation               |  
| **Containerization** | Docker, Docker Compose, Kubernetes              |  
| **Orchestration**  | Docker Swarm                                     |  
| **Version Control** | Git, GitHub                                     |  
| **CI/CD**          | GitHub Actions                                  |  
| **Testing**        | JUnit                                            |  
| **Monitoring**     | Loki, Grafana, Prometheus                        |  

---

## Project Structure  

```  
Hyundai Sales Management System  
│  
├── aws                   # AWS Infrastructure Configurations  
│   ├── ansible           # Ansible playbooks and configurations  
│   ├── keys              # AWS keys and access management  
│   └── terraform         # Terraform scripts for AWS resources  
├── backend               # Backend Service (Spring Boot Application)  
├── docker                # Docker and Docker Compose Configurations  
├── docs                  # Documentation Folder  
│   ├── docker.md         # Docker Documentation  
│   ├── HELP.md           # Project Help Documentation  
│   ├── images            # Project-related images  
│   ├── infra.md          # Infrastructure Documentation  
│   └── k8s.md            # Kubernetes Documentation  
├── frontend              # Frontend Service (Next.js Application)  
├── k8s                   # Kubernetes Configuration and Manifests  
├── LICENSE               # License for the project  
└── README.md             # Project Readme file  
```  

---

## Getting Started  

### Prerequisites  

Ensure you have the following installed:  

- **Node.js 20+** (for frontend)  
- **Java 21** (for backend)  
- **Docker & Docker Compose**  
- **MySQL**  
- **Kubernetes**  
- **kubectl**  

---

### Installation  

Clone the repository:  

```sh  
git clone https://github.com/marouanedbibih/hyundai-sales.git  
cd hyundai-sales  
```  

---

### Running the Project  

#### Run Backend (Standalone)  

```sh  
cd backend  
./mvnw install  
./mvnw test  
./mvnw spring-boot:run  
```  

#### Run Frontend (Standalone)  

```sh  
cd frontend  
npm install  
npm test  
npm run dev  
```  

---

## Docker Documentation  

This section covers the Docker implementation in this project. Docker is utilized to streamline development, manage multi-environment configurations, and build the core infrastructure, including networks, storage, and databases. It also handles the creation of Docker images and workload orchestration. For more details, please refer to the [Docker Documentation](./docs/docker.md).  

---

## Kubernetes Deployment  

The Hyundai Sales Management System is configured for deployment on a Kubernetes cluster to ensure scalability, resilience, and efficient resource management. The project includes Kubernetes manifests that define the deployment of core application components, such as the frontend, backend, and database. For detailed information on setting up and managing the Kubernetes deployment, refer to the [Kubernetes Documentation](docs/k8s.md).  

---

## API Documentation  

The backend is fully documented using Swagger. You can check the API documentation after running the project at `/swagger-ui.html`.  

---

## Contributing  

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

## License  

This project is **open-source** under the **MIT License**.  

---

## Contact  

For any inquiries, reach out to:  

**Marouane Dbibih** – [marouane.dbibih@outlook.com](mailto:marouane.dbibih@outlook.com)  
**LinkedIn** – [LinkedIn Profile](https://www.linkedin.com/in/marouanedbibih/)  

**Live Demo**  
[Hyundai Sales Management System](http://hyundai-sales.marouanedbibih.studion)  