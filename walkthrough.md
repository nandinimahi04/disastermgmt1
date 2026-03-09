# Disaster Management Project Walkthrough

**Latest Milestone**: Crowdsourced Incident Reporting & Resource Inventory modules implemented with an Emergency Red light theme.

**User Roles**:
- **Admin**: Full control over disasters, alerts, resources, and **incident verification**.
- **Responder**: Manage assigned tasks and view regional resources.
- **Citizen**: View alerts and **submit emergency reports**.

**Key Routes**:
- `/dashboard`: Shared dashboard with role-specific widgets.
- `/disasters`: List and register new disasters (Admin).
- `/alerts/broadcast`: Regional alert dispatch (Admin).
- `/incidents`: Review crowdsourced citizen reports (Admin).
- `/resources`: Supply chain and inventory management (Admin/Responder).
- `/tasks`: Rescue task status management (Responder).
- `/login` / `/register`: JWT-based authentication flow.

**Theme highlights**:
- Use of CSS variables for a consistent red-accented theme.
- Glassmorphism effects on cards for a modern, high-tech command center feel.
- High accessibility standards for emergency response usage.
