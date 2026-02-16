---
description: how to run the disaster management project in VS Code
---

### Prerequisites
1. **Java JDK 17+** installed.
2. **Node.js** installed.
3. **MySQL Server** running.

### Step 1: Database Setup
1. Open your MySQL client (like MySQL Workbench or Command Line).
2. Create the database:
```sql
CREATE DATABASE disaster_db;
```
3. (Optional) Check `src/main/resources/application.properties` and verify your MySQL `username` and `password`.

### Step 2: Run Backend (Spring Boot)
1. Open VS Code in the root folder: `c:\Users\vinay\Downloads\disastermgmt\Disaster_Managment_System`.
2. Open a new terminal (`Ctrl + ` `).
3. Run the following command:
// turbo
```powershell
.\mvnw spring-boot:run
```
Wait until you see "Started DisasterApplication in X seconds".

### Step 3: Run Frontend (Angular)
1. Open a second terminal window in VS Code.
2. Navigate to the frontend directory:
```powershell
cd Disaster_frontend/disaster-frontend
```
3. Install dependencies (only required the first time):
```powershell
npm install
```
4. Start the Angular development server:
// turbo
```powershell
npm start
```
5. Open your browser and go to `http://localhost:4200`.

---
**Note**: The backend runs on `http://localhost:8080` and the frontend runs on `http://localhost:4200`.
