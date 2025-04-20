
# Mini Leetcode Clone

## **Features**
- Submit algorithm problems (title, description, tags, difficulty).
- Search/filter problems by title, tags, or difficulty.
- Execute JS code safely via `/api/evaluate`.

## **Setup**
### **Local**
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Set up MongoDB:
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) and add the URI to `.env.local`:
     ```env
     MONGODB_URI=your_connection_string
     ```
3. Run the app:
   ```bash
   pnpm dev
   ```
   
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### **Docker**
```bash
docker compose up -d  # App runs on http://localhost:3000
```

## **Assumptions**
- Default MongoDB URI is provided in `.env.local` for local testing.
- Sandboxed code execution uses `vm` for security.
- Frontend is built with Next.js (App Router) and Tailwind CSS.

## **Project Structure**
```
src/
├── app/               # Next.js routes
│   ├── api/           # API endpoints (evaluate, problems)
│   ├── create/        # Problem submission page
│   └── problems/      # Problem list and detail pages
├── components/        # Reusable UI components
├── config/            # App configuration
├── db/                # MongoDB models/connection
└── lib/               # Utilities

```

## **API Endpoints**
- `POST /api/problems`: Submit a new problem.
- `GET /api/problems`: Fetch all problems (supports search/filter).
- `POST /api/evaluate`: Execute JS code (e.g., `{ code: "function add(a,b) { return a+b; }", args: [2, 3] }`).

## **Video Notes**
- Demo recorded on production build (`pnpm build` + `pnpm start`).
- Video covers UI flow, code highlights, and Docker deployment.

### How to Use:
1. Copy the entire block above.
2. Paste it into a new file named `README.md` in your project root.
3. Adjust MongoDB URI or other details if needed.

This version includes:
- Clear setup instructions (local + Docker)
- Key assumptions
- Project structure overview
- API documentation
- Video recording context