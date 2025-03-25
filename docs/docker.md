# Docker Documentation

## Overview  
This document provides a comprehensive explanation of how Docker is utilized in the Hyundai Sales project. It includes the project’s folder structure, details of Dockerfiles, Docker Compose configurations, and a guide on building, running, and managing Docker images and containers. Additionally, it touches on Docker Swarm for scaling and managing distributed services.

## Folder Structure  
Below is the folder structure of the `docker` directory in the project:  

```
├── build.frontend.sh      # Shell script to build the frontend image
├── compose.devops.yml     # Docker Compose file for the DevOps environment
├── compose.local.yml      # Docker Compose file for local development
├── compose.prod.yml       # Docker Compose file for production
├── compose.yml            # Main Docker Compose file (Infrastructure)
├── Dockerfile.backend     # Dockerfile for building the backend service
├── Dockerfile.frontend    # Dockerfile for building the frontend service
├── infra.sh               # Shell script for setting up the infrastructure
├── init.sql               # SQL script for initializing the database
├── local.sh               # Shell script to run the application locally
└── shutdown.sh            # Shell script to stop and remove containers
```

## Dockerfile

### 1. **Dockerfile.backend**  
This Dockerfile is used to build the backend service. It contains two stages: one for building the backend with Maven and the second for configuring the environment variables and running the production build.

### 2. **Dockerfile.frontend**  
This Dockerfile is used to build the frontend service. It includes a stage to build the static files with an `ARG` to configure the backend base URL dynamically. This allows the image to be adapted for different environments, such as Kubernetes, virtual machines (VMs), and cloud environments.

## Docker Compose

The project contains multiple Docker Compose files tailored for different environments:  

### 1. **compose.yml**  
This is the primary Compose file, which may reference other Compose files. It defines the overall configuration for services, networks, and volumes.

### 2. **compose.local.yml**  
Used for local development. This file may configure services with hot-reloading or use local resources.  

### 3. **compose.prod.yml**  
Used for production deployments. This configuration may include optimizations such as multi-stage builds, reverse proxies, and security settings.

### 4. **compose.devops.yml**  
A specialized configuration for managing DevOps tasks, monitoring, and logging.

---

## How to Run the Compose File  
To run the application using Docker Compose, follow these steps:  

1. **Navigate to the project’s docker folder:**  
   ```bash
   cd ~/Projects/Personal/hyundai-sales/docker
   ```  

2. **Run Docker Compose:**  
   - **For local development:**  
     ```bash
     docker compose -f compose.yml -f compose.local.yml up --build
     ```  

   - **For production:**  
     ```bash
     docker compose -f compose.yml -f compose.prod.yml up -d
     ```  

3. **Stopping the Containers:**  
   Use the following command to stop and remove containers, networks, and volumes:  
   ```bash
   docker-compose down
   ```  

---

## How to Build and Push the Image  

1. **Build the Image:**  
   ```bash
   docker build -t your-username/hyundai-backend:latest -f Dockerfile.backend .
   ```  

2. **Tag the Image:**  
   ```bash
   docker tag your-username/hyundai-backend:latest your-username/hyundai-backend:v1.0.0
   ```  

3. **Push the Image to Docker Hub:**  
   ```bash
   docker push your-username/hyundai-backend:v1.0.0
   ```  

---

## Docker Swarm  

Docker Swarm is used for managing clusters of Docker nodes. It provides load balancing, scaling, and fault tolerance.  

### Steps to Set Up and Deploy with Docker Swarm:  

1. **Initialize Swarm Mode:**  
   ```bash
   docker swarm init
   ```  

2. **Deploy Stack:**  
   ```bash
   docker stack deploy -c compose.prod.yml hyundai-stack
   ```  

3. **Scale Services:**  
   ```bash
   docker service scale hyundai-stack_backend=5
   ```  

4. **Monitor Services:**  
   ```bash
   docker service ls
   docker service ps hyundai-stack_backend
   ```  

---

## Conclusion  

This documentation provides a detailed overview of Docker usage in the Hyundai Sales project, covering Dockerfiles, Compose configurations, image building, and Docker Swarm. By following these guidelines, you can efficiently manage the project's containerized infrastructure for development, testing, and production environments.

