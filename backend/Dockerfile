# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-alpine AS build

# Set the volume for the temporary directory
VOLUME /tmp

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Install the dependencies and build the application
RUN ./mvnw install -DskipTests

# Stage 2: Create the final image
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Define build arguments
ARG SERVER_PORT
ARG SPRING_APPLICATION_NAME
ARG SPRING_DATASOURCE_URL
ARG SPRING_DATASOURCE_USERNAME
ARG SPRING_DATASOURCE_PASSWORD
ARG TRACCAR_API_URL
ARG CORS_ALLOWED_ORIGINS

# Set environment variables from build arguments
ENV SERVER_PORT=${SERVER_PORT}
ENV SPRING_APPLICATION_NAME=${SPRING_APPLICATION_NAME}
ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}
ENV TRACCAR_API_URL=${TRACCAR_API_URL}
ENV CORS_ALLOWED_ORIGINS=${CORS_ALLOWED_ORIGINS}

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE $SERVER_PORT

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]

# End of the Dockerfile