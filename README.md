ITC Technical Challenge

A Pokemon listing application built with **Next.js 16 (App Router)**, demonstrating the core differences between **Server-Side Rendering (SSR)** and **Client-Side Rendering (CSR)** with advanced filtering and pagination.

## 🚀 Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly Typed)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first approach)
* **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
* **Image Optimization:** `next/image` with custom loading states and Shimmer effects.

---

## ⏱️ Development Timeline

The project was completed in approximately **4 hours and 30 minutes**.

| Phase | Duration | Description |
| :--- | :--- | :--- |
| **Requirements Analysis** | 30 mins | Analyzing user stories, defining CSR vs SSR scope, and planning the data flow. |
| **API Research** | 30 mins | Deep dive into [PokeAPI.co](https://pokeapi.co/) documentation to handle filtering and pagination logic. |
| **Boilerplate & Structure** | 30 mins | Initializing the project, configuring Tailwind v4, and setting up the Service Layer architecture. |
| **Core Implementation** | 3 hours | Developing API services, reusable UI components, and the dual-rendering pages (CSR/SSR). |
| **Total Time** | **4h 30m** | |

---

## 🛠️ Key Features

### Hybrid Rendering Strategy
* **/pokemon**: Uses **Client-Side Rendering (CSR)** with React Query for a seamless, app-like experience with instant feedback.
* **/pokemon-ssr**: Uses **Server-Side Rendering (SSR)** for superior SEO and fast initial page loads, utilizing Next.js Server Components.

---

## 📦 Getting Started
First, install dependencies
```bash
yarn install
```
Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
