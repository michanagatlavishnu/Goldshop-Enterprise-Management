# GoldShop Enterprise Management System

## Overview

GoldShop Enterprise Management System is a full-stack web application designed to streamline and automate jewelry shop operations. The system enables efficient management of customers, ornaments, billing, sales, orders, and daily gold/silver rates through a secure and user-friendly platform.

The application is developed to support both shop owners and customers by providing role-based access, real-time rate management, customer purchase tracking, and business reporting.

---

## Key Features

### Customer Management

* Add, update, view, and delete customer records
* Maintain customer contact information and purchase history
* Track pending balances and payment status
* Search customers by name or mobile number

### Ornament Management

* Manage gold and silver ornaments
* Store ornament details such as weight, purity, making charges, and price
* Support multiple categories:

  * Chains
  * Rings
  * Bangles
  * Necklaces
  * Earrings
  * Haram
  * Silver Items
  * Custom Designs

### Daily Rate Management

* Update daily gold and silver rates
* Automatic price calculation based on current market rates
* Weight-based cost estimation

### Billing & Orders

* Generate customer bills
* Maintain order records
* View transaction history
* Store purchase details securely

### Enterprise Dashboard

* Monitor sales performance
* View customer statistics
* Analyze business growth
* Access monthly and yearly reports

### Role-Based Access Control

* **Admin/Owner**

  * Full access to customer data
  * Sales reports and analytics
  * Product and rate management

* **Customer**

  * View available ornaments
  * Check personal orders
  * Track pending balances

---

## Technology Stack

### Frontend

* React.js
* Vite
* HTML5
* CSS3
* JavaScript

### Backend

* Spring Boot
* Spring MVC
* Spring Data JPA
* RESTful APIs

### Database

* MySQL

### Development Tools

* Maven
* Git & GitHub
* Postman
* VS Code / Eclipse

---

## System Architecture

```text
React Frontend
       │
       ▼
Spring Boot REST APIs
       │
       ▼
     MySQL
```

---

## Project Structure

```text
GoldShop-Enterprise-Management/
│
├── frontend_p1/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend_p1/
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
│
└── README.md
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/your-username/GoldShop-Enterprise-Management.git
```

### Backend Setup

```bash
cd backend_p1/gold-shop-management
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:9866
```

### Frontend Setup

```bash
cd frontend_p1
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Future Enhancements

* PDF Bill Generation
* WhatsApp Bill Sharing
* SMS Notifications
* Inventory & Stock Management
* Multi-language Support (English & Telugu)
* Cloud Deployment (AWS)
* Docker Containerization
* CI/CD Pipeline using GitHub Actions
* Advanced Sales Analytics Dashboard

---

## Authors

**Bhuvana Reddy Asupalle**
**Michanagatla Vishnu**

B.Tech – Computer Science Engineering
KL University

---

## Project Status

🚀 Active Development

This project is being developed as a full-stack enterprise solution for modern jewelry shop management and business automation.
