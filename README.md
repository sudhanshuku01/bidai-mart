## **📌 BID.ai - Marketplace for Digital Products**

![Homepage](./bidai.png)

BID.ai is a **digital product marketplace** where users can list, buy, and sell digital products with a **view-based model**. Admins can track top sellers and best-performing listings.

---

## **🚀 Features**

- **User Dashboard**: Add products, track views, and share referral links.
- **Admin Dashboard**: Monitor total listings, top sellers, and high-performing products.
- **View-Based Model**: Products have limited views, encouraging strategic purchases.
- **Secure Authentication**: JWT-based authentication for users and admins.

---

## **🛠 Tech Stack**

- **Frontend**: React, TypeScript, Vite, Context API
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT-based authentication
- **Styling**: Pure CSS

---

## **Setup Instructions**  

### **1️⃣ Install Dependencies**  
#### **Frontend**  
```sh
npm install
```
#### **Backend**  
```sh
cd backend
npm install
```

### **2️⃣ Setup Environment Variables**  
Create a `.env` file inside the `backend` folder with the following:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **3️⃣ Run the Application**  

#### **Start Backend**  
```sh
cd backend
npm run server.js
```

#### **Start Frontend**  
```sh
npm run dev
```


    