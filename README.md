# Linklytics

**Linklytics** is a full-stack URL shortener with built-in click analytics. Paste a long link, get a short one you can share, and track how many people open it, day by day, from your own dashboard.

🔗 **Live demo:** [linklyytics.netlify.app](https://linklyytics.netlify.app/)

---

## Features

- **Short links in seconds**: turn any long URL into an 8-character short link. The new link is copied to your clipboard automatically.
- **Click tracking**: every visit to a short link is recorded with its date and time.
- **Analytics dashboard**: a daily click graph across all your links, plus a click count and click graph for each link.
- **User accounts**: sign up and log in. Each user sees and manages only their own links.
- **Secure by design**: passwords are hashed with BCrypt and API requests are authenticated with JSON Web Tokens (JWT).
- **Responsive UI**: works on desktop and mobile.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, Tailwind CSS, Material UI, TanStack React Query, Axios, Chart.js, Framer Motion |
| Backend | Java 21, Spring Boot 4, Spring Security, Spring Data JPA, JJWT, Lombok |
| Database | PostgreSQL (hosted on [Neon](https://neon.tech)) |
| Hosting | Frontend on [Netlify](https://www.netlify.com), backend on [Render](https://render.com) (Docker) |

## How It Works

```
 User ──► React app (Netlify) ──► Spring Boot API (Render) ──► PostgreSQL (Neon)
```

1. A logged-in user submits a long URL. The backend generates a random 8-character code and saves the mapping.
2. The short link has the form `https://<frontend>/s/<code>`.
3. When someone opens it, the React app forwards the browser to the backend at `/<code>`.
4. The backend records a click event and responds with an HTTP `302` redirect to the original URL.
5. The dashboard reads the recorded click events and shows them as graphs.

