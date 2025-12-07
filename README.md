# Retail Management System

A full-stack retail analytics platform featuring a modern sales dashboard and a robust backend API supporting advanced search, filtering, sorting, and pagination.
(Supports all 1M+ records with indexing for fast selects.)
---

## 1. Overview

This system enables detailed exploration of retail sales data with real-time search, dynamic filters, pagination, and sorting controls.
The backend provides structured analytical endpoints, while the frontend renders a fast and interactive dashboard experience.

---

## 2. Tech Stack

| Layer     | Technology                                           |
| --------- | ---------------------------------------------------- |
| Frontend  | React, Vite, Tailwind CSS, lucide-react, react-range |
| Backend   | Node.js, Express.js, Prisma                          |
| Database  | SQLite (better-sqlite3)                              |
| Utilities | CORS, CSV parser                                     |
| Env       | `VITE_API_BASE_URL` for frontend configuration       |

---

## 3. Search Implementation Summary

Search behavior is unified across the stack.

### Backend

Search matches across multiple data fields using case-insensitive partial matching:

* Customer name and phone number
* Product name and tags
* Store location
* Employee name

### Frontend

* Uses a debounced search input to avoid unnecessary requests.
* Every time the debounced value changes, the query string is rebuilt and both the table data and summary data are refreshed.
* The search term is sent as:

```txt
?search=<value>
```

---

## 4. Filter Implementation Summary

The platform supports complex filtering on both frontend and backend.

### Frontend Filters

Supported filters include:

* Multi-select options (e.g., regions, categories)
* Numeric range slider (e.g., age)
* Date range filter
* Free-form tag input

Query formatting examples:

| Filter Type  | Example                                 |
| ------------ | --------------------------------------- |
| Multi-select | `customerRegion=A&customerRegion=B`     |
| Age Range    | `ageMin=20&ageMax=45`                   |
| Date Range   | `dateFrom=2024-01-01&dateTo=2024-12-31` |
| Tags         | `tags=electronics,refund,bonus`         |

Any filter change triggers a refreshed query using the same central query-building logic.

### Backend Filter Handling

The backend supports:

* Categorical filters via inclusion lists (e.g., `customerRegion`, `gender`, `productCategory`, `paymentMethod`)
* Partial text matching for tags
* Numeric ranges using `ageMin` / `ageMax`
* Date ranges using `dateFrom` / `dateTo`

---

## 5. Sorting Implementation Summary

Sorting is controlled using a `sortBy` query parameter.

### Backend Supported Options

* `date_desc` *(default)* – newest sales first
* `date_asc` – oldest sales first
* `quantity` – highest quantity first
* `customer_name` – alphabetical by customer name
* `amount` – highest total amount first

### Frontend Query Format

Sorting updates the query string and refetches table + summary:

```txt
?sortBy=<value>
```

Example:

```txt
?salesRegion=A&sortBy=amount_desc
```

---

## 6. Pagination Implementation Summary

Pagination is supported across both backend and frontend.

### Backend

Pagination is implemented using Prisma's `skip` and `take` with:

* `_page` – current page number (default: `1`)
* `_limit` – items per page (default: `10`)

The response includes:

* `data` – current page of sales records
* `total` – total number of matching records
* `page` – current page
* `limit` – items per page
* `totalPages` – total pages based on `total` and `limit`

### Frontend

The frontend uses a 1-based `page` value and a fixed `limit` when calling the API:

```txt
?page=2&limit=10
```

Pagination updates do **not** reset active filters or search; all parameters are preserved in the query string.

---

## 7. Setup Instructions

### Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```
3. Db Setup:

```bash
// Run in dev mode
npx prisma migrate dev --name init
// Stream csv data to prisma sqlite db
node prisma/seed.js
```



3. Start the server:

```bash
npm src/index.js
```

The backend will be available at:

```txt
http://0.0.0.0:3000
```

> Ensure the SQLite database file exists or is initialized via Prisma migrations as needed.

---

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the frontend root with:

```txt
VITE_API_BASE_URL=http://localhost:3000
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on the Vite dev server (default: `http://localhost:5173` or similar, as shown in the terminal).

---

## Notes

* Debounced search and a shared query-builder help minimize unnecessary network calls.
