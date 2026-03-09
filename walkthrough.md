# Disaster Management System Walkthrough

This document tracks the implementation milestones and provides a guide for navigating the platform.

## Latest Milestone: Redesign & Feature Expansion (March 2026)
- **UI Refresh**: Migrated from Dark UI to a Light Emergency Red theme.
- **Resource Inventory**: Implemented backend and frontend for global supply tracking.
- **Dashboard Switcher**: Refined role-based logic for Admin, Responder, and Citizen views.

## User Roles
1. **Admin**: Can manage disasters, broadcast alerts, and track resources.
2. **Responder**: Assigned to rescue tasks, can update progress and view resources.
3. **Citizen**: Receives regional alerts and can request emergency rescue.

## Navigation
- `/dashboard`: Role-based command center.
- `/disasters`: (Admin) Disaster registration.
- `/alerts/broadcast`: (Admin) Regional alert targeting.
- `/tasks`: (Responder/Admin) Rescue operation tracking.
- `/resources`: (Admin/Responder) Supply inventory management.
