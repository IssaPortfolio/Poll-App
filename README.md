# PollApp

PollApp is a web application for creating and participating in polls, built with React and Vite. Follow the instructions below to set up the project on your local machine.

## Step-by-Step Installation Guide

### Step 1: Download and Install Node.js

1. Visit the [Node.js official website](https://nodejs.org/) and download the latest LTS version.
2. Follow the installation instructions for your operating system.
3. To verify the installation, run the following command in your terminal or command prompt:
   ```bash
   node -v
   npm -v

### Step 2: Install Dependencies

1. cd PollApp
2. Install Dependencies
   ```bash
   npm install

### Step 3: Create the .env File
In the main project folder, create a .env file and add the following environment variables.
You may use this as an example:
   ```bash
   MYSQL_HOST="127.0.0.1"
   MYSQL_USER="root"
   MYSQL_PASSWORD="pass1234"
   MYSQL_DATABASE="Project"
   SESSION_SECRET="secret123"
   BACKEND_API_URL="http://localhost:4000/api"
   FRONTEND_URL="http://localhost:5173"
   ALLOWED_ORIGINS="http://localhost:5173"
```

### Step 4: Set Up MySQL Database
1. Run these MySQL queries:
   ```bash
   CREATE DATABASE IF NOT EXISTS Project;
   USE Project;

### Step 5: Run the application
1. In your terminal, run:
   ```bash
   npm run dev
3. Visit
   ```bash
   http://localhost:5173
