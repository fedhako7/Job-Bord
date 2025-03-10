# Job Board

## Overview
Job Board is a full-stack web application that connects employers with job seekers. Employers can post job openings, while job seekers can search and apply for positions effortlessly. The platform provides a seamless experience with a user-friendly interface and secure authentication.

## Features
- **Job Posting & Management**: Employers can create, update, and delete job listings.
- **Job Search & Application**: Job seekers can browse and apply for jobs using search filters.
- **User Authentication**:
  - JWT-based authentication
  - Google OAuth 2.0 login
  - Email confirmation successfull application
- **User Dashboards**:
  - Employers can manage job listings
  - Job seekers can track applications
- **Database Management**: MySQL handles job listings, user profiles, and applications.
- **Responsive UI**: Built with React and Tailwind CSS for a smooth user experience.

## Tech Stack
### Frontend
- **React.js**: For building dynamic and interactive UI
- **Tailwind CSS**: For styling and responsiveness

### Backend
- **Node.js & Express.js**: For handling server-side logic
- **MySQL**: For structured data storage
- **JWT & Google OAuth 2.0**: For authentication security
- **Nodemailer**: For email confirmation

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (latest LTS version recommended)
- **MySQL**
- **Git**

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/fedhako7/job-board.git
   cd job-board
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., database credentials, JWT secret, OAuth keys).
4. Start the backend server:
   ```sh
   node app.js
   ```
5. Start the frontend:
   ```sh
   npm run dev
   ```

## Project Goals
### This project was built to:
- Demonstrate full-stack development skills using modern frameworks and tools.
- Showcase secure authentication and database management in a real-world application.

## Future Improvements
- Implement real-time notifications for job updates.
- Add an admin dashboard for better platform moderation.
- Introduce AI-based job recommendations.

## Contact
For any inquiries, reach out via [fedhasayelmachew@gmail.com](mailto:fedhasayelmachew@gmail.com).

