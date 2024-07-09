# Use the official node image as the base image
FROM node:latest

# Define the environment variable
ARG VITE_API_KEY

# Set the environment variable

ENV VITE_API_KEY=$VITE_API_KEY

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

EXPOSE 80

# Command to start the Vite preview
CMD ["npm", "run", "preview"]
