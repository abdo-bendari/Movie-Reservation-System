# About
Movie Reservation System is a comprehensive platform designed to provide users with a seamless and engaging movie ticket reservation experience. The system allows users to explore a diverse range of movies, search by title, filter based on genres, actors, or dates, and choose their preferred seats for specific showtimes. Payments are securely processed using **Stripe**, with an additional option for cash payments. To enhance user experience, the platform includes a robust Customer Support Chat feature powered by **Socket.IO**, enabling real-time communication with customer service. This feature is further enhanced by an automated chatbot utilizing **Natural Language Processing (NLP)** to handle common queries intelligently, offering instant assistance before escalating to a human agent if needed.
The project is built with **TypeScript** to ensure strong typing and maintainable code, leveraging **Node.js** for the backend. Critical functionalities include user authentication, movie listing and filtering, seat selection, and reservation management, seamlessly linking users, movies, and seats. **Nodemailer** is integrated for sending email notifications, such as ticket confirmations and updates, while the review system allows users to provide feedback, enhancing the platform’s quality. The system is further enriched with efficient payment handling, supporting both online and offline methods, and an intuitive ticketing module for tracking and managing reservations.
With its modular and scalable architecture, the Movie Reservation System delivers a user-friendly and reliable experience, making it a perfect solution for moviegoers and administrators alike.
## Features

<ul> <li><strong>User Authentication</strong>: Secure sign-up and login processes using JWT (JSON Web Tokens) for authentication and encrypted passwords to ensure data security.</li> <li><strong>Movie Catalog</strong>: A detailed list of movies, including titles, genres, showtimes, descriptions, and actor information, allowing users to browse and select easily.</li> <li><strong>Movie Categories</strong>: Movies are organized into categories such as action, drama, comedy, and more, making it easy for users to discover their preferred genre.</li> <li><strong>Search and Filters</strong>: Advanced search and filtering capabilities to help users locate movies based on dates, genres, and actor names effortlessly.</li> <li><strong>Seat Reservation</strong>: Interactive seat selection feature with real-time availability, enabling users to choose and reserve specific seats for their desired showtimes.</li> <li><strong>Ticket Management</strong>: Digital tickets are generated upon successful booking, providing users with a QR code for convenient entry at the cinema.</li> <li><strong>Cinema Information</strong>: Users can view details about cinemas, including location, available facilities, and currently running shows.</li> <li><strong>Payment Integration</strong>: Secure and seamless payment processing through Stripe, supporting various payment methods to confirm reservations effectively.</li> <li><strong>Customer Support Chat</strong>: Real-time customer support chat functionality using Socket.IO, ensuring users receive immediate assistance when needed.</li> <li><strong>Chatbot Assistance</strong>: A chatbot powered by NLP (Natural Language Processing) to provide automated responses to frequently asked questions and common inquiries.</li> <li><strong>Reviews & Ratings</strong>: Users can rate and review movies after watching, helping others make informed choices based on shared feedback.</li> <li><strong>Email Notifications</strong>: Automated email notifications via Nodemailer to confirm bookings, send reminders, and notify users of important updates.</li> <li><strong>Data Validation</strong>: Strict data validation using Joi to ensure the accuracy and integrity of user inputs, such as booking details and payments.</li> <li><strong>Admin Dashboard</strong>: An admin panel to manage movies, schedules, users, bookings, and reviews, providing full control over system operations.</li> <li><strong>Secure Data Handling</strong>: Implementation of best practices like Helmet for securing HTTP headers, protecting the system from common vulnerabilities.</li> <li><strong>Real-Time Updates</strong>: Real-time updates using Socket.IO for seat availability and instant chat responses.</li> <li><strong>Error Handling and Logging</strong>: Comprehensive error-handling mechanisms and detailed logging using Morgan for efficient debugging and monitoring.</li> </ul>

## Using

The platform is built with the following technologies:

<ul>
  <li><strong>MongoDB</strong>: A NoSQL database used to store flexible data, such as movie listings, user profiles, reviews, tickets, and cinema details. MongoDB is chosen for its scalability and its ability to handle unstructured data.</li>
  <li><strong>Mongoose</strong>: An Object Data Modeling (ODM) library for MongoDB and Node.js. Mongoose simplifies database interactions by defining schemas and models and offering powerful query capabilities.</li>
  <li><strong>Node.js</strong>: JavaScript runtime used for building the backend services, providing the foundation for building scalable and efficient APIs.</li>
  <li><strong>Express.js</strong>: A lightweight web framework for building RESTful APIs and managing HTTP requests and responses, helping to structure the application.</li>
  <li><strong>Socket.IO</strong>: Enables real-time communication between the client and server, used for implementing live chat support and movie-related notifications.</li>
  <li><strong>Stripe</strong>: A payment gateway for processing payments. Stripe is integrated to securely handle ticket bookings, allowing users to make payments directly on the platform.</li>
  <li><strong>JWT (JSON Web Tokens)</strong>: Used for securing user authentication and ensuring that only authorized users can access protected routes and services.</li>
  <li><strong>bcrypt</strong>: A library for securely hashing user passwords before storing them in the database, protecting user data.</li>
  <li><strong>Nodemailer</strong>: A module for sending email notifications such as booking confirmations and alerts for special events.</li>
  <li><strong>Natural</strong>: A natural language processing (NLP) library used to power the chatbot feature, helping users with queries and information about movie bookings and services.</li>
  <li><strong>Joi</strong>: A data validation library used to validate user input, ensuring that all requests, including ticket bookings and reviews, are correct and secure.</li>
  <li><strong>dotenv</strong>: Loads environment variables from a .env file, keeping sensitive information like API keys and database credentials secure.</li>
  <li><strong>CORS</strong>: Middleware for enabling secure cross-origin requests between the client and the backend API, ensuring proper security during communication.</li>
  <li><strong>Nodemon</strong>: A development tool that automatically restarts the server when file changes are detected, improving the development workflow.</li>
</ul>

## Collections

The project uses several collections to store data related to users, courses, payments, and other essential information. Below are the key collections used in the platform:

- **Users**: Stores user details such as name, email, password, role (student, instructor, admin), and enrollment history.
- **Courses**: Contains course information including course name, description, instructor, price, and associated lectures.
- **Lectures**: Stores individual lecture details, including title, video URL, and course association.
- **Assignments**: Contains information about assignments for each course, including the assignment title, description, and due date.
- **Payments**: Tracks user payments for courses, including payment method, amount, and status.
- **Ratings**: Stores ratings given by students for courses and lectures.
- **Reviews**: Allows students to leave written reviews for courses and instructors.
- **Submissions**: Tracks student submissions for assignments, including grade and feedback from instructors.
- **Inquiries**: Stores inquiries made by students to instructors or support teams.
- **Certificates**: Contains information about issued certificates for completed courses, including the issue date and certificate URL.

# API Endpoints Documentation

This document provides a detailed description of all available API endpoints for the platform.

## Auth API

### `POST /auth/signUp`
- **Description**: Registers a new user in the system. This endpoint requires the user's details, including a unique email and password. The system checks if the email is already in use before completing the registration.

### `POST /auth/signIn`
- **Description**: Authenticates a user and generates a token. The user must provide their email and password. Upon successful authentication, the user will receive a JWT token for future requests.

### `PATCH /auth`
- **Description**: Allows a user to change their password. This action requires the user to provide the old password and the new one for security reasons.

---

## User API

### `PUT /users/:id`
- **Description**: Updates user information based on the user ID. The user must be authenticated and have proper permissions to modify their own data.

### `DELETE /users/:id`
- **Description**: Deletes a user from the system. Only admins have permission to perform this action. The user specified by the `id` will be permanently removed.

### `GET /users/:id`
- **Description**: Retrieves the details of a specific user by their ID. This endpoint requires the user to be authenticated.

### `GET /users`
- **Description**: Fetches all users from the system. Accessible only by authenticated admins.

### `POST /users/enroll`
- **Description**: Enrolls a user in a specific course. This action requires that the user is logged in and authorized to enroll.

### `POST /users/complete`
- **Description**: Marks a course as completed for the user. The user must have successfully finished the course to use this endpoint.

### `POST /users/notification`
- **Description**: Sends notifications to users. This feature is typically used by admins to inform users about important updates.

---

## Course API

### `POST /courses`
- **Description**: Creates a new course in the system. This endpoint is restricted to admin users, who must provide details such as the course title, description, and content.

### `PUT /courses/:id`
- **Description**: Updates course details for a specific course ID. Admin users are allowed to modify course information, such as description and content.

### `DELETE /courses/:id`
- **Description**: Deletes a course by its ID. Admin privileges are required to delete a course from the system.

### `GET /courses/:id`
- **Description**: Fetches the details of a specific course using the course ID. All authenticated users can access course details.

### `GET /courses`
- **Description**: Retrieves a list of all courses available in the system. Access is restricted to authenticated users.

### `GET /courses/filter`
- **Description**: Filters courses based on certain criteria like category or difficulty level. This is useful for users to find courses matching their preferences.

### `GET /courses/userCourses`
- **Description**: Retrieves all courses enrolled by the current user. This endpoint helps users to track their progress.

### `GET /courses/search`
- **Description**: Searches for courses based on keywords or categories. It helps users quickly find relevant courses in the system.

---

## Enrollment API

### `POST /enrollments`
- **Description**: Allows users to enroll in a course. This endpoint requires authentication and is generally used by students to sign up for available courses.

### `PUT /enrollments/:id/status`
- **Description**: Updates the enrollment status for a specific course enrollment. This can include changing the enrollment to completed or withdrawn.

### `GET /enrollments/userEnrollments`
- **Description**: Retrieves all course enrollments for a specific user. This endpoint helps users track their current courses.

---

## Inquiry API

### `POST /inquiries`
- **Description**: Submits an inquiry or question about a course or topic. Users can use this feature to ask for more information.

### `GET /inquiries/forUser`
- **Description**: Retrieves inquiries made by a specific user. This is available only to admins to help them manage and respond to user inquiries.

### `GET /inquiries/forCourse/:courseId`
- **Description**: Fetches inquiries related to a specific course. This helps admins or instructors respond to questions about the course content.

### `DELETE /inquiries/:id`
- **Description**: Deletes a specific inquiry from the system. Admins have permission to remove any inquiry.

---

## Lecture API

### `POST /lectures`
- **Description**: Adds a new lecture to a course. This is restricted to instructors who can add content to their assigned courses.

### `GET /lectures/lectures/:id`
- **Description**: Retrieves details about a specific lecture using its ID. All authenticated users can access lecture details.

### `PUT /lectures/:id`
- **Description**: Updates the content or details of a specific lecture. Only instructors have permission to modify lecture content.

### `DELETE /lectures/:id`
- **Description**: Deletes a lecture from a course. Instructors can delete their lectures from courses they are assigned to.

### `GET /lectures/:courseId`
- **Description**: Fetches all lectures for a specific course. Useful for students to view available content within a course.

---

## Payment API

### `POST /payments`
- **Description**: Processes a payment for a course. Only students can initiate a payment for enrolling in a course.

### `GET /payments`
- **Description**: Retrieves all payment records in the system. Only admins have access to this data for auditing and reporting purposes.

### `PUT /payments/:id`
- **Description**: Updates the status of a payment. Admins can mark payments as completed or failed based on the payment gateway response.

### `DELETE /payments/:id`
- **Description**: Deletes a specific payment record. Admins can remove incorrect or cancelled payments from the system.

---

## Rating API

### `POST /ratings`
- **Description**: Adds a rating for a specific course. Users can rate courses based on their experience after completing the course.

### `GET /ratings/:courseId`
- **Description**: Fetches the ratings for a specific course. This allows potential students to evaluate the course based on others' feedback.

### `DELETE /ratings/:id`
- **Description**: Deletes a rating for a course. Only admins are allowed to remove a course rating.

---

## Review API

### `POST /reviews`
- **Description**: Adds a review for a specific course. Reviews typically include feedback on the course content and instructor performance.

### `GET /reviews/:courseId`
- **Description**: Retrieves all reviews for a given course. Users can read reviews before enrolling in a course.

### `PUT /reviews/:id`
- **Description**: Updates a specific review. Admins or the user who submitted the review can modify their review content.

### `DELETE /reviews/:id`
- **Description**: Deletes a specific review. Admins have the ability to remove any review from the system.

---

## Submission API

### `POST /submissions/:assignmentId`
- **Description**: Submits an assignment for grading. Students can upload their assignments related to a specific course or module.

### `PUT /submissions/:submissionId`
- **Description**: Grades a specific assignment submission. Instructors can provide grades and feedback for student submissions.

### `GET /submissions/assignment/:assignmentId`
- **Description**: Fetches all submissions for a specific assignment. Useful for instructors to view all student submissions.

### `GET /submissions/user/:userId`
- **Description**: Retrieves all assignment submissions made by a specific user. This helps instructors track a student's performance.

---

## Certificate API

### `POST /certificates`
- **Description**: Issues a certificate for a user upon course completion. Instructors or admins can generate certificates for students who successfully complete a course.

### `GET /certificates`
- **Description**: Fetches all certificates issued to users. Only admins can access this data to verify student achievements.

### `DELETE /certificates/:id`
- **Description**: Deletes a specific certificate. Instructors or admins can revoke certificates if necessary.

---

## Assignment API

### `POST /assignments`
- **Description**: Adds a new assignment for a course. Instructors can create assignments for their students to complete.

### `GET /assignments/:courseId`
- **Description**: Retrieves all assignments for a specific course. Students can view the assignments they need to complete.

### `PUT /assignments/:id`
- **Description**: Updates the details of an assignment. Instructors can modify assignments, such as changing deadlines or questions.

### `DELETE /assignments/:id`
- **Description**: Deletes an assignment. Only instructors can remove assignments from a course.



## Key Takeaways from this Project

Course Platform is a robust, user-friendly platform designed to deliver high-quality online education. With features like course enrollment, assignment submissions, payment management, and certification issuance, the platform aims to provide a seamless learning experience. Secure user authentication and authorization ensure that access to resources is role-based, while data validation maintains the integrity of user inputs. The project utilizes technologies like Helmet, Morgan, JWT, MySQL, and Sequelize, offering a scalable solution for online learning.

## Project Inspiration

This project was inspired by the growing demand for accessible and efficient online learning platforms. The goal was to create an intuitive, scalable solution that provides students with the ability to enroll, complete courses, and earn certificates, while also allowing instructors to manage their content seamlessly. The platform is designed to streamline the learning process and foster a community where learners can grow, develop new skills, and engage with educational content in a meaningful way.

