# Template Todo App

[日本語](../../README.md) | English

Todo application using Next.js/Antd

## Implemented UI

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <figure>
        <img src="../images/ui-1.png" />
        <figcaption>Task Management (/tasks)</figcaption>
    </figure>
    <figure>
        <img src="../images/ui-2.png" />
        <figcaption>Account Management (/accounts)</figcaption>
    </figure>
    <figure>
        <img src="../images/ui-3.png" />
        <figcaption>Create New Account (/accounts/new)</figcaption>
    </figure>
</div>

## Setup Instructions

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd template-todo-app
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up virtual environment and database

   ```bash
   # Start PostgreSQL with Docker
   docker compose up -d

   # Sync database schema
   npx prisma db push

   # Seed sample data
   pnpm db:seed
   ```

4. Start the server

   ```bash
   pnpm dev
   ```

5. Verify the setup
   - Access `http://localhost:3000` in your browser
   - Check account management and task management features
