# Stage 1: Build the React app
FROM node:20-alpine AS build

# Update apk and upgrade packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the React app
FROM node:20-alpine

# Update apk and upgrade packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Stage 2: Serve the app
FROM node:20-alpine

WORKDIR /app

# Install serve to run the build
RUN npm install -g serve

# Copy the build output from previous stage
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
