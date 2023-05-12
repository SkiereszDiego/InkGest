## Documentation and Artifacts
<details>
<summary>Click to expand</summary>
 
## [Elevator Pitch](elevator_pitch.md)
 
## [Canva MVP](canvas-do-produto.md)

## [Realese Planning](planejamento-da-release.md)

## [Solution Development](desenvolvimento-da-solucao.md)

</details>


# Inkgest Tattoo Studio Management System
This is a web-based management system for a tattoo studio. It allows customers to register, view available products, and make appointments, while also providing staff with tools for managing inventory, scheduling appointments, and more.

## Getting Started
<details>
<summary>Click to expand</summary>

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repo

``` 
    git clone  https://github.com/SkiereszDiego/InkGest.git
```

2. Install NPM packages in the root and client directories
``` 
    cd inkgest
    npm install
    cd client
    npm install
``` 
3. Create a .env file in the root directory and add the following variables
``` 
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
``` 
4. Start the application
``` 
    npm run dev
``` 
This will start the server and client applications concurrently.

</details>

## Project Structure
<details>
<summary>Click to expand</summary>
The project is organized into separate directories for the frontend and backend applications. <br>
Here's a breakdown of the project structure:

```
inkgest/
├── server/
│   ├── config/                  
│   │   └── db.js                
│   ├── controllers/
│   │   ├── client_controller.js                      
│   │   ├── inventory_controller.js
│   │   └── users_controller.js
│   ├── middleware/              
│   │   ├── log_middleware.js
│   │   └── login_middleware.js 
│   ├── models/       
│   │   ├── anamnese_model.js
│   │   ├── client_model.js
│   │   ├── inventory_model.js
│   │   └── users_model.js  
│   ├── routes/
│   │   ├── client_route.js                  
│   │   ├── inventory_route.js
│   │   ├── login_route.js
│   │   └── users_route.js
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── ...
├── LICENSE
├── README.md 
 
```

### Frontend
The frontend will be built using Angular and will be located in the client directory. The directory structure is as follows:

- public/: contains the app.html file and other public assets
- src/: contains the React components and application logic
    - components/: contains the reusable React components used throughout the application
    - App.js: the root component of the application

### Backend
The backend is built using Node.js and Express, and communicates with the MongoDB database using Mongoose. The directory structure is as follows:

- controllers/: contains the controllers that handle requests and responses
- models/: contains the Mongoose models for the MongoDB collections
- routes/: contains the Express routes for the API endpoints
- app.js: the main entry point for the backend application
</details>

## Features

<details>
<summary>Click to expand</summary>

### Customer Registration
Customers can register for an account and view their account information, including their appointment history and any products they've purchased.

### Product Registration
Staff can add new products to the system, including information about the product, such as name, price, and quantity on hand.

### User Registration
Staff can create new user accounts, assign roles and permissions, and manage user accounts.

### Inventory Control
Staff can manage the inventory of products, including viewing product information, adding new products, and updating product information.

### Gift Card System
Customers can purchase gift cards, which can be redeemed for products or services at the studio. Staff can view gift card balances and redeem gift cards as payment for appointments and purchases.
</details>

## License
This project is licensed under the MIT License - see the LICENSE file for details.
