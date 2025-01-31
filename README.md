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
  <li><strong>Express.js</strong>: A lightweight web framework for building RESTful APIs and managing HTTP requests and responses, helping to structure the application.</li>
  <li><strong>Socket.IO</strong>: Enables real-time communication between the client and server, used for implementing live chat support and movie-related notifications.</li>
  <li><strong>Stripe</strong>: A payment gateway for processing payments. Stripe is integrated to securely handle ticket bookings, allowing users to make payments directly on the platform.</li>
  <li><strong>JWT (JSON Web Tokens)</strong>: Used for securing user authentication and ensuring that only authorized users can access protected routes and services.</li>
  <li><strong>bcrypt</strong>: A library for securely hashing user passwords before storing them in the database, protecting user data.</li>
  <li><strong>Nodemailer</strong>: A module for sending email notifications such as booking confirmations and alerts for special events.</li>
  <li><strong>Natural</strong>: A natural language processing (NLP) library used to power the chatbot feature, helping users with queries and information about movie bookings and services.</li>
  <li><strong>dotenv</strong>: Loads environment variables from a .env file, keeping sensitive information like API keys and database credentials secure.</li>
  <li><strong>CORS</strong>: Middleware for enabling secure cross-origin requests between the client and the backend API, ensuring proper security during communication.</li>
  <li><strong>Nodemon</strong>: A development tool that automatically restarts the server when file changes are detected, improving the development workflow.</li>
</ul>

## Collections

<p>The platform utilizes the following collections in MongoDB to manage different types of data:</p>

<ul>
  <li><strong>Movie</strong>: Stores detailed information about each movie, including the title, description, director, cast, genres, and related metadata such as release year and duration.</li>
  <li><strong>Genre</strong>: Contains all the movie genres (e.g., Action, Drama, Comedy, etc.). Each movie can be associated with one or more genres.</li>
  <li><strong>Theater</strong>: Information about the cinemas, including location, available theaters, and facilities. This collection helps users choose theaters based on the movies they want to watch.</li>
  <li><strong>Schedule</strong>: Stores movie showtimes, including the theater, date, and time. This allows users to select their preferred time and location for watching a movie.</li>
  <li><strong>Seat</strong>: Contains information about available seats in each theater for a given movie schedule. This collection ensures users can select their seats before making a reservation.</li>
  <li><strong>Reservation</strong>: Tracks user reservations for movies. It includes details about the movie, showtime, selected seats, and the associated user.</li>
  <li><strong>Ticket</strong>: Stores ticket information for each reservation, including payment status, ticket details (movie, time, seats), and the user who made the reservation.</li>
  <li><strong>User</strong>: Contains user profiles, including personal information, preferences, past reservations, and ticket details. It also stores authentication data securely.</li>
  <li><strong>Payment</strong>: Tracks payment transactions, including the amount paid, payment method (e.g., Stripe), and transaction status. This collection ensures proper transaction tracking for movie tickets.</li>
  <li><strong>Review</strong>: Stores user reviews and ratings for movies. Each review is associated with a user and a movie, allowing users to provide feedback on their movie experience.</li>
  <li><strong>Notification</strong>: Stores real-time notifications for users, such as reminders about upcoming movies, ticket confirmations, and promotional offers.</li>
  <li><strong>Chat</strong>: Contains user interactions with the customer support chat system. This collection holds messages and logs, helping support teams track and resolve user queries and issues.</li>
</ul>


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

## Movie API

### `POST /movies`
- **Description**: Adds a new movie to the system. This endpoint requires the user to be authenticated and have admin privileges. The request should include movie details like title, genre, and other relevant information.

### `PUT /movies/:id`
- **Description**: Updates an existing movie by its ID. This endpoint requires the user to be authenticated and have admin privileges. The request must include the updated movie details.

### `DELETE /movies/:id`
- **Description**: Deletes a movie from the system by its ID. The user must be authenticated and have admin privileges to perform this action.

### `GET /movies`
- **Description**: Retrieves a list of all movies in the system. The request requires the user to be authenticated.

### `GET /movies/byActor`
- **Description**: Retrieves a list of movies that feature a specific actor. The request requires the user to be authenticated.

### `GET /movies/topRated`
- **Description**: Retrieves a list of the top-rated movies in the system. The request requires the user to be authenticated.

### `GET /movies/search`
- **Description**: Allows searching for movies by title or ID. The request requires the user to be authenticated and can be filtered by title or movie ID.


---

## Genre API

### `POST /genres`
- **Description**: Adds a new genre to the system. This endpoint requires the user to be authenticated and have admin privileges. The request should include the genre name and other related information.

### `GET /genres`
- **Description**: Retrieves a list of all genres in the system. The request requires the user to be authenticated.

### `GET /genres/:id`
- **Description**: Retrieves a specific genre by its ID. The request requires the user to be authenticated.

### `PUT /genres/:id`
- **Description**: Updates an existing genre by its ID. This endpoint requires the user to be authenticated and have admin privileges. The request must include the updated genre information.

### `DELETE /genres/:id`
- **Description**: Deletes a genre from the system by its ID. The user must be authenticated and have admin privileges to perform this action.

### `GET /genres/:id/movie`
- **Description**: Retrieves a list of movies associated with a specific genre. The request requires the user to be authenticated.

### `POST /genres/:id/addMovie`
- **Description**: Adds a movie to a specific genre. This endpoint requires the user to be authenticated and have admin privileges. The request must include the movie details to associate it with the genre.


---

## Schedule API

### `POST /schedules`
- **Description**: Creates a new schedule for a movie in a specific theater. This endpoint requires the user to be authenticated and have admin privileges. The request should include the schedule details such as movie, theater, date, and time.

### `GET /schedules`
- **Description**: Retrieves a list of all schedules available in the system. The request requires the user to be authenticated.

### `GET /schedules/search`
- **Description**: Searches for a schedule based on movie or theater. The request requires the user to be authenticated. You can filter schedules by movie title or theater.

### `PUT /schedules/:id`
- **Description**: Updates a specific schedule by its ID. This endpoint requires the user to be authenticated and have admin privileges. The request must include the updated schedule information.

### `DELETE /schedules/:id`
- **Description**: Deletes a schedule by its ID. The user must be authenticated and have admin privileges to perform this action.


---

## Theater API

### `POST /theaters`
- **Description**: Adds a new theater to the system. This endpoint requires the user to be authenticated and have admin privileges. The request must include the theater details such as name, location, and capacity.

### `PUT /theaters/:id`
- **Description**: Updates the information of an existing theater by its ID. This action requires the user to be authenticated and have admin privileges. The request should include the updated theater details.

### `DELETE /theaters/:id`
- **Description**: Deletes a theater by its ID. The user must be authenticated and have admin privileges to perform this action.

### `GET /theaters`
- **Description**: Retrieves a list of all theaters in the system. The request requires the user to be authenticated.

### `GET /theaters/:id`
- **Description**: Retrieves detailed information about a specific theater by its ID. The request requires the user to be authenticated.

### `POST /theaters/:id/addMovie`
- **Description**: Adds a movie to a specific theater. This action requires the user to be authenticated and have admin privileges. The request must include the movie details.

### `GET /theaters/:id/theaterMovies`
- **Description**: Retrieves a list of movies currently available in a specific theater by its ID. The request requires the user to be authenticated.


---

## Seat API

### `POST /seats`
- **Description**: Adds a new seat to the system. This endpoint requires the user to be authenticated and have admin privileges. The request must include the seat details such as seat number and status.

### `GET /seats`
- **Description**: Retrieves a list of all seats in the system. The request requires the user to be authenticated.

### `GET /seats/search`
- **Description**: Searches for a seat by its ID or seat number. The request requires the user to be authenticated.

### `PUT /seats/:id`
- **Description**: Updates the status of an existing seat by its ID. This action requires the user to be authenticated and have admin privileges.

### `DELETE /seats/:id`
- **Description**: Deletes a seat by its ID. The user must be authenticated and have admin privileges to perform this action.


---

## Reservation API

### `POST /reservations`
- **Description**: Creates a new reservation. The user must be authenticated and have admin privileges. This endpoint requires details of the reservation, such as the movie, seat selection, and user details.

### `GET /reservations`
- **Description**: Retrieves a list of all reservations. The user must be authenticated and have admin privileges.

### `GET /reservations/:id`
- **Description**: Retrieves a reservation by its ID. The user must be authenticated and have admin privileges.

### `PUT /reservations/:id`
- **Description**: Updates the payment status of a reservation. This action requires the user to be authenticated and have admin privileges.

### `DELETE /reservations/:id`
- **Description**: Deletes a reservation by its ID. The user must be authenticated and have admin privileges.


---

## Ticket API

### `POST /tickets`
- **Description**: Creates a new ticket. The user must be authenticated and have admin privileges. This endpoint requires ticket details such as reservation, seat, and payment status.

### `GET /tickets`
- **Description**: Retrieves a list of all tickets. The user must be authenticated and have admin privileges.

### `GET /tickets/:id`
- **Description**: Retrieves a ticket by its ID. The user must be authenticated and have admin privileges.

### `GET /tickets/user/:userId`
- **Description**: Retrieves all tickets for a specific user based on their user ID. The user must be authenticated.

### `GET /tickets/reservation/:reservationId`
- **Description**: Retrieves all tickets for a specific reservation based on the reservation ID. The user must be authenticated.

### `PUT /tickets/:id`
- **Description**: Updates the ticket details. The user must be authenticated and have admin privileges.

### `DELETE /tickets/:id`
- **Description**: Deletes a ticket by its ID. The user must be authenticated and have admin privileges.

### `PATCH /tickets/:id/cancel`
- **Description**: Cancels a ticket by its ID. The user must be authenticated and have admin privileges.

### `GET /tickets/all/active`
- **Description**: Retrieves all active tickets. The user must be authenticated and have admin privileges.

### `GET /tickets/all/cancelled`
- **Description**: Retrieves all cancelled tickets. The user must be authenticated and have admin privileges.


---

## Payment API

### `POST /payments`
- **Description**: Creates a new payment. The user must be authenticated. The request requires payment details such as amount, user, reservation, and payment status.

### `GET /payments`
- **Description**: Retrieves a list of all payments. The user must be authenticated.

### `GET /payments/:id`
- **Description**: Retrieves a payment by its ID. The user must be authenticated.

### `PUT /payments/:id`
- **Description**: Updates the payment status for a specific payment ID. This action is restricted to admins.

### `DELETE /payments/:id`
- **Description**: Deletes a payment by its ID. This action is restricted to admins.


---

## Review API

### `POST /reviews`
- **Description**: Creates a new review for a movie. The user must be authenticated. The request requires a movie ID and the review content.

### `GET /reviews/Recent`
- **Description**: Retrieves a list of the most recent reviews. The user must be authenticated.

### `GET /reviews/:movieId/Movie`
- **Description**: Retrieves reviews for a specific movie based on the movie ID. The user must be authenticated.

### `GET /reviews/:userId/user`
- **Description**: Retrieves reviews made by a specific user based on the user ID. The user must be authenticated.

### `DELETE /reviews/:id`
- **Description**: Deletes a review by its ID. This action is restricted to admins.


---

## Notification API

### `POST /notifications`
- **Description**: Creates a new notification. The action is restricted to admins.

### `PATCH /notifications/:id`
- **Description**: Marks a notification as read based on its ID. The user must be authenticated.

### `DELETE /notifications/:id`
- **Description**: Deletes all notifications for a specific user. The action is restricted to admins.


---

## Chat API

### `POST /chat/start`
- **Description**: Starts a new chat session. This endpoint initializes a new chat between the user and the system.

### `GET /chat/:chatId`
- **Description**: Retrieves the chat messages for a specific chat session based on the chat ID.

### `POST /chat/message`
- **Description**: Sends a new message in an existing chat session. The message is processed by the system for further handling.




## Key Takeaways from this Project

This project has provided invaluable hands-on experience in building a fully integrated movie reservation system, which included essential features such as real-time movie listings, seat selection, payment gateway integration, and user authentication. Throughout the development process, I honed my skills in designing efficient API endpoints, handling user data securely, and optimizing the user experience. Additionally, the project enhanced my understanding of implementing complex relationships within databases, as well as integrating third-party services like Stripe for secure payments. By focusing on scalability and performance, the system was built to accommodate future growth and provide a seamless experience for both users and administrators.


## Project Inspiration

The inspiration for this movie reservation system stemmed from the growing demand for digital transformation in the entertainment industry. With the increasing reliance on online platforms for booking services, I saw an opportunity to create a system that combines convenience, accessibility, and security. The idea was to provide moviegoers with an intuitive platform to discover movies, easily reserve seats, and complete payments—all within a seamless digital experience. The project was designed to address common challenges in the current market, such as inefficient booking processes and limited movie discovery options, while also exploring the integration of real-time data and third-party payment solutions to enhance user satisfaction.






