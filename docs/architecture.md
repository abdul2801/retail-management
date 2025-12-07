# Retail Management Application Architecture

This document outlines the high-level architecture, key components, data flow, and module responsibilities for the Retail Management Application.

---

## Backend Architecture

The backend is an API server built on the **Node.js** runtime using the **Express** framework. It utilizes **Prisma** as an Object-Relational Mapper (ORM) to interact with a **SQLite** database.

### Key Components:

* **Server Entry Point**: `src/index.js` initializes the Express application, configures essential middleware (CORS, JSON parsing), and mounts all defined routes.
* **Routing**: `src/routes/` defines API endpoints and maps them directly to the corresponding controller functions.
* **Controllers**: `src/controllers/` are responsible for handling incoming HTTP requests, validating input (e.g., query parameters), and invoking services. They manage sending the final HTTP responses.
* **Services**: `src/services/` contain the core **business logic** and interact with the database via the Prisma client. They are kept strictly decoupled from the HTTP layer.
* **Database**: **SQLite** is used as the persistent data store, managed via the Prisma Client (`src/utils/db.js`).

---

## Frontend Architecture

The frontend is a modern **Single Page Application (SPA)** built with **React** and bundled using **Vite**. Styling is managed using the utility-first framework, **Tailwind CSS**.

### Key Components:

* **Entry Point**: `main.jsx` is the initial file that mounts the root React application.
* **Main Application**: `App.jsx` serves as the root component, handling application-wide layout and routing (rendering the main dashboard page).
* **Pages**: `src/pages/` holds the main views of the application (e.g., `SalesDashboard.jsx`).
* **Components**: `src/components/` stores reusable UI elements, categorized into:
    * `ui/`: Generic, reusable UI components.
    * `dashboard/`: Feature-specific components for the dashboard.
* **Services**: `src/services/` handles all API communication with the backend, primarily using the native `fetch` API.
* **State Management**: Local component state and side effects are managed using React's built-in hooks (`useState`, `useEffect`, `useMemo`).

---

## Data Flow (Fetching Sales Data Example)


1.  **User Interaction**: A user interacts with the UI in the `SalesDashboard` (e.g., applies filters or changes the page).
2.  **API Request**: The `SalesDashboard` component triggers an asynchronous API call using a function from `src/services/salesService.js`.
3.  **Route Handling**: The backend receives the request (e.g., at the `/sales` endpoint). `src/index.js` routes it via `src/routes/sales.routes.js`.
4.  **Controller Processing**: The request is handled by `src/controllers/sales.controller.js`. The controller validates incoming query parameters (`page`, `limit`, `filters`).
5.  **Service Execution**: The controller calls the appropriate business logic service, such as the `getSales` function in `src/services/sales.service.js`.
6.  **Database Query**: The service constructs a dynamic Prisma `where` clause using helper functions (`src/utils/filters.js`) and executes the query against the SQLite database.
7.  **Response**: The database returns data to the service, which passes it back to the controller. The controller sends a JSON response to the frontend.
8.  **UI Update**: The frontend receives the data, updates the relevant component state, and React re-renders the components (like the `SalesTable`) to display the new information.

---

##  Folder Structure


| Folder | Contents | Description |
| :--- | :--- | :--- |
| `/backend/` | `prisma/`, `src/` | Node.js/Express API server code and database schema. |
| `/frontend/` | `src/`, `App.jsx`, `main.jsx` | React SPA source code and configuration. |

### Backend Structure (`/backend/src`)

| Sub-Folder | Responsibility |
| :--- | :--- |
| `controllers/` | Request handlers, input validation, and HTTP response formatting. |
| `routes/` | API endpoint definitions and mapping to controllers. |
| `services/` | Core business logic and direct database access (via Prisma). |
| `utils/` | Helper functions, including the Prisma DB client. |

### Frontend Structure (`/frontend/src`)

| Sub-Folder | Responsibility |
| :--- | :--- |
| `components/` | Reusable UI elements (e.g., buttons, tables). |
| `hooks/` | Custom React hooks for shared logic. |
| `pages/` | Main application views (e.g., `SalesDashboard.jsx`). |
| `services/` | API client functions for backend communication. |
| `utils/` | General-purpose frontend helper functions. |

---

## 🧩 Module Responsibilities

| Module | Location | Responsibility |
| :--- | :--- | :--- |
| **Sales Controller** | `backend/src/controllers/sales.controller.js` | Validates query parameters, handles errors, formats JSON responses. |
| **Sales Service** | `backend/src/services/sales.service.js` | Implements logic for fetching sales data, including pagination and filtering. |
| **Summary Service** | `backend/src/services/summary.service.js` | Calculates aggregate statistics (total revenue, units sold). |
| **Filter Utility** | `backend/src/utils/filters.js` | Constructs dynamic Prisma `where` clauses based on frontend filters. |
| **Sales Dashboard** | `frontend/src/pages/SalesDashboard.jsx` | Orchestrates the main view, manages local state (filters/pagination), and initiates data fetching. |
| **Sales API Service** | `frontend/src/services/salesService.js` | Encapsulates sales-related API endpoints and network requests. |
| **Filter Bar Component** | `frontend/src/components/dashboard/FilterBar.jsx` | Renders filter inputs and handles user filter selection changes. |
| **Sales Table Component** | `frontend/src/components/dashboard/SalesTable.jsx` | Displays fetched sales data in a clean, tabular format. |