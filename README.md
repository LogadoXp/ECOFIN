# ECOFIN — Demo React App (Vite)

This is a small demo scaffold created from the code you provided in the chat.
It includes lightweight UI component stubs so it can run without external UI libraries.

How to run locally:

1. Unzip and enter the folder:
   ```bash
   cd ecofin
   npm install
   npm run dev
   ```
2. Open http://localhost:5173

How to deploy to Vercel:

- Option A — Upload ZIP:
  - Compress this folder to `ecofin.zip`
  - In Vercel dashboard choose "New Project" -> "Import Project" -> "Upload" and upload the zip.

- Option B — GitHub:
  - Initialize a git repo, push to GitHub and import that repo in Vercel.

Notes:
- Tailwind + Vite are configured; if you want the original design system components instead of the simple stubs, replace `src/components/ui/*` with your preferred library components and adjust imports.
