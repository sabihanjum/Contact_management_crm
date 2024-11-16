# **Contact Management Feature**

This project is a mini CRM feature for managing contact information. Users can add, view, update, and delete contacts, making it easy to track important details about clients or customers. This README provides step-by-step guidance to set up, run, and understand the project.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Database Setup](#database-setup)
6. [Running the Project](#running-the-project)
7. [API Endpoints](#api-endpoints)
8. [Future Enhancements](#future-enhancements)

---

## **Features**
- **Add New Contacts**: Users can add a contact with fields like name, email, phone, company, and job title.
- **View Contacts**: A paginated and sortable table displays all contacts.
- **Edit Contacts**: Update any contact's details when needed.
- **Delete Contacts**: Remove outdated or duplicate contacts.
- **Error Handling**: Validates fields and handles errors gracefully.

---

## **Technologies Used**
- **Frontend**: ReactJS with Material-UI (MUI)
- **Backend**: Node.js with Express.js
- **Database**: MySQL (using SQLyog)
- **API Testing**: Postman or any REST client

---

## **Prerequisites**
Ensure you have the following installed on your system:
1. [Node.js](https://nodejs.org/) (v14+)
2. [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
3. [MySQL](https://www.mysql.com/) or SQLyog
4. A code editor like [VS Code](https://code.visualstudio.com/)

---

## **Installation**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/contact-management.git
   cd contact-management
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

---

## **Database Setup**
1. **Create Database**:
   In MySQL or SQLyog, create a new database:
   ```sql
   CREATE DATABASE contacts_db;
   ```

2. **Create Contacts Table**:
   Execute the following SQL query to create the `contacts` table:
   ```sql
   CREATE TABLE `contacts` (
       `id` INT NOT NULL AUTO_INCREMENT,
       `firstName` VARCHAR(255) NOT NULL,
       `lastName` VARCHAR(255) NOT NULL,
       `email` VARCHAR(255) NOT NULL,
       `phone` VARCHAR(20) NOT NULL,
       `company` VARCHAR(255),
       `jobTitle` VARCHAR(255),
       PRIMARY KEY (`id`)
   );
   ```

3. **Test the Connection**:
   Run the backend and ensure it connects to the database successfully:
   ```bash
   cd backend
   npm start
   ```

---

## **Running the Project**
1. **Start the Backend**:
   Open a terminal and run:
   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend**:
   Open another terminal and run:
   ```bash
   cd frontend
   npm start
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the application.

---

## **API Endpoints**
### Base URL: `http://localhost:5000`
1. **Add Contact**:
   - Method: `POST`
   - Endpoint: `/contacts`
   - Body:
     ```json
     {
       "firstName": "John",
       "lastName": "Doe",
       "email": "john.doe@example.com",
       "phone": "1234567890",
       "company": "Example Inc.",
       "jobTitle": "Manager"
     }
     ```

2. **Get All Contacts**:
   - Method: `GET`
   - Endpoint: `/contacts`

3. **Update Contact**:
   - Method: `PUT`
   - Endpoint: `/contacts/:id`
   - Body:
     ```json
     {
       "firstName": "Jane",
       "lastName": "Doe",
       "email": "jane.doe@example.com",
       "phone": "0987654321",
       "company": "Example Inc.",
       "jobTitle": "Director"
     }
     ```

4. **Delete Contact**:
   - Method: `DELETE`
   - Endpoint: `/contacts/:id`

---

## **Future Enhancements**
- Add authentication for secured access.
- Implement bulk import/export functionality for contacts.
- Add additional fields like address or social media links.
- Integrate a search bar for quick contact lookup.

---

## **Contributing**
Contributions are welcome! Feel free to fork the repository and submit a pull request.

1. Fork the project.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your message'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

