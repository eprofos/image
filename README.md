# Image Annotation App

This is an image annotation application built with Node.js and React.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

### Development Environment

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Start the development environment:
   ```
   docker compose up --build
   ```

   This will build the Docker image and start the container. The application will be available at `http://localhost:3000`.

3. The application will run in development mode, with hot-reloading enabled. Any changes you make to the source files will be reflected in the browser.

### Production Environment

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Start the production environment:
   ```
   docker compose -f compose.prod.yaml up --build -d
   ```

   This will build the Docker image optimized for production and start the container. The application will be available at `http://localhost:80`.

## Running the Application

- For development:
  ```
  docker compose up
  ```

- For production:
  ```
  docker compose -f compose.prod.yaml up -d
  ```

To stop and remove the containers, networks, and volumes associated with this application:
```
docker compose down
```
or
```
docker compose -f compose.prod.yaml down
```

## Additional Information

- The application runs on port 3000 in development mode and port 80 in production mode.
- The Docker setup uses Node.js 14 as the base image.
- In development mode, the application directory is mounted as a volume, allowing for live code updates.
- In production mode, the application is built inside the Docker container and served using the `serve` package.

For more details about the application structure and features, please refer to the documentation in the `docs/` directory.