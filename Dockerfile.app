# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose a port (optional, if your application needs to listen on a specific port)
EXPOSE 3000

# Add a Version label
LABEL Version="1.0"

# Add a Name label
LABEL Name="My Node.js app"

# Define the command to run when the container starts
CMD node app.js
