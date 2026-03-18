# CTSE Lab 06 — Order Management Frontend

A Next.js frontend for submitting orders to the microservices backend via an API Gateway. Orders are published to Kafka and consumed by the Order, Inventory, and Billing services.

## Architecture

```
Frontend (Next.js)
      │
      ▼  POST /orders
API Gateway :8080
      │
      ├── Order Service     :8081  →  publishes order events to Kafka
      ├── Inventory Service :8082  →  consumes events, updates stock
      └── Billing Service   :8083  →  consumes events, processes payment
```

## Prerequisites

- Node.js 18+
- Backend API Gateway running (see backend repo)

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Create a `.env.local` file in the project root:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Default | Description |
   |---|---|---|
   | `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | Base URL of the API Gateway |

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (static export) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
  layout.tsx          # Root layout
  page.tsx            # Main page (order form + session history)
components/
  OrderForm.tsx       # Order submission form with sample payloads
  OrderHistory.tsx    # Session order history list
```

## Tech Stack

- [Next.js 14](https://nextjs.org/) (static export mode)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript
