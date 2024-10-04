# PollApp

[PollApp](http://18.117.166.89/) is a unique social media platform centered around polls, allowing users to create polls, vote on them, and view the results. Built with a robust stack of technologies including Node.js, Express.js, React, MySQL, Bootstrap, HTML, CSS, and Vite, PollApp offers a seamless experience for engaging with friends, colleagues, or the wider community.

Whether you want to use it for fun, work, or to stay informed about various topics, PollApp makes decision-making more interactive and enjoyable. The application features a user-friendly interface with a home page, login and registration functionalities, and a dedicated dashboard for managing polls and results.

I implemented both front-end and back-end components to ensure smooth user interaction and efficient data handling. Additionally, PollApp is deployed on AWS EC2, leveraging an S3 bucket for secure cloud-based image storage.

![HomeHero](https://github.com/user-attachments/assets/b5a50253-2760-4677-bded-9cb7ff40547f)
![HomeFullScreen](https://github.com/user-attachments/assets/ec1a345b-ba69-4cba-bc3b-b0e43e970973)
![Login](https://github.com/user-attachments/assets/80e38598-a2a7-4eb0-8b75-0cc29e68cb79)
![Dashboard](https://github.com/user-attachments/assets/8a6e0a6c-8968-43dc-9a91-7ef37cd0fd15)

## Step-by-Step Installation Guide
Follow the instructions below to set up the project on your local machine.

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
