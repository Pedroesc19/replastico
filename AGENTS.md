# Contribution Guidelines

This repository contains a React frontend and an Express backend. Follow these guidelines when submitting changes.

## Code style

- Use **2 spaces** for indentation in all JavaScript files.
- Prefer **double quotes** and terminate statements with semicolons.
- Organize code inside the appropriate directory: `backend/` for server code and `frontend/` for React code.

## Testing

- Install dependencies before running tests:
  ```bash
  cd backend && yarn install
  cd ../frontend && yarn install
  ```
- Run frontend tests with:
  ```bash
  cd frontend
  yarn test --watchAll=false
  ```
- There are currently no automated tests for the backend.

## Manual steps

- Ensure the backend can start with `node server.js` from the `backend/` directory.
- The frontend should build successfully with `yarn build` from the `frontend/` directory.

## Commit messages

- Use the imperative mood (e.g., "Add feature" not "Added feature").
- Mention the directories you modified when relevant, such as `backend:` or `frontend:`.
- Provide a brief summary of the change.
