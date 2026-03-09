# Disaster Management & Alert System (DMAS) - Project Overview

## 🚨 Project Statement
In disaster-prone regions, early warnings and efficient rescue coordination are the keys to saving lives. The **Disaster Management & Alert System (DMAS)** is a centralized command-and-control platform designed to bridge the communication gap between authorities, first responders, and citizens. By integrating real-time disaster monitoring, regional alert broadcasting, and resource inventory tracking, DMAS ensures a rapid and coordinated response to emergencies.

---

## 🌟 Core Features & Modules

### 1. Unified Authentication & Role Management
The system supports three distinct user roles, each with a tailored command interface:
- **Admin**: Strategic oversight, disaster registration, alert broadcasting, and resource management.
- **Responder**: Operational task management, status reporting, and resource oversight.
- **Citizen**: Safety monitoring, regional alert reception, and emergency rescue requests.

### 2. Live Disaster Monitoring
- **Real-Time Feed**: Track active disasters (floods, earthquakes, wildfires) globally.
- **Geospatial Visualization**: A specialized "Command Center" dashboard with interactive map markers and severity indicators.
- **Dynamic Severity Control**: Classify events from 'Low' to 'Critical' to prioritize response.

### 3. Smart Alert Broadcasting
- **Regional Targeting**: Send localized alerts to specific provinces or cities (e.g., "Kerala", "California").
- **Citizen Feeds**: Citizens only see alerts relevant to their registered region, reducing information overload.
- **Urgency Indicators**: Visual cues (Emergency Red theme) and animations for critical warnings.

### 4. Rescue Operation Management
- **Task Assignment**: Admins assign specific rescue tasks to active Responders.
- **Progress Tracking**: Real-time status updates (Pending → Ongoing → Completed).
- **Transparency**: Every task is linked to a disaster event and a primary responder for accountability.

### 5. Emergency Resource Inventory (New Feature) 📦
- **Supply Tracking**: Manage stockpiles of Water, Medicine, Food, and Tools.
- **Warehouse Logistics**: Track resource quantities across different base camps/warehouses.
- **Efficiency Metrics**: Visualization of resource distribution across affected regions.

### 6. Crowdsourced Incident Reporting (New Feature) 🚨
- **Citizen Empowerment**: Citizens can report incidents directly with location and severity.
- **Admin Verification**: Direct pipeline for authorities to verify public reports before broadcasting alerts.
- **SOS Actions**: Integrated emergency assistance requests with severity tracking.

---

## 🎨 Design & UX
- **Theme**: Light & Professional with **High-Visibility Emergency Red** accents.
- **Aesthetics**: Glassmorphism components, radial gradients for auth pages, and micro-animations for data loading.
- **Accessibility**: Designed for quick reading in high-stress situations (clear hierarchy, high contrast).

---

## 🛠 Technical Stack

### **Backend (Spring Boot)**
- **Framework**: Spring Boot 3.2.x (Java 17)
- **Security**: Spring Security 6 with **JWT (JSON Web Tokens)** for stateless authentication.
- **Data**: Spring Data JPA with **H2 In-Memory Database**.
- **Lombok**: For clean, boilerplate-free model definitions.

### **Frontend (Angular)**
- **Framework**: Angular 19+ (Standalone Component Architecture).
- **Styling**: Vanilla CSS with a custom Design System.
- **UX**: RxJS for reactive data handling and animated transitions.

---

## 🚀 Getting Started

### Setup Instructions
1. **Backend**: Run `./mvnw.cmd spring-boot:run`
2. **Frontend**: Run `npm start` in the `frontend` directory.

---

## 🔑 Test Credentials (Seed Data)
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin123` |
| **Responder** | `responder@test.com` | `responder123` |
| **Citizen** | `citizen@test.com` | `citizen123` |

---

## 📈 Future Roadmap
- **Real-Time Sync**: Integration of WebSockets for instant alert pushes.
- **External APIs**: Integration with OpenWeatherMap and NDMA live feeds.
- **Mobile App**: Cross-platform mobile version for citizens.
- **Offline Mode**: Local caching of safety instructions.
