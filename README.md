
# Tonstakers Test Assignment

This guide will help you set up, run, and test the Tonstakers Test Assignment project.

## Prerequisites

Ensure you have the following tools installed on your machine:
- Node.js (v16 or higher, checked v22)
- npm or yarn
- Git

## Cloning the Repository

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/Greyewi/tonstakers_test_assignment.git
    ```
2. Navigate to the project directory:
    ```bash
    cd tonstakers_test_assignment
    ```

## Installing Dependencies

Run the following command to install all required dependencies:

```bash
npm i
```

or if you use yarn:

```bash
yarn
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start Vite’s development server, and you can view the app at `http://localhost:5173`.

## Building the Project

To create a production build, run:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Running Tests

Run the following command to execute all tests using Vitest:

```bash
npm run test
```

## Code Formatting and Linting

### Formatting with Prettier

To format the code, run:

```bash
npm run format
```

### Linting with ESLint

To check for linting issues, run:

```bash
npm run lint
```

To fix linting issues automatically, use:

```bash
npm run lint:fix
```

## Type Checking

To ensure TypeScript type correctness, run:

```bash
npm run type-check
```

## Continuous Integration (CI)

This project includes a GitHub Actions CI configuration file located at `.github/workflows/ci.yml`. The CI pipeline checks the following on every push:
- Code linting
- Type checking
- Unit tests

### Setting Up CI

Ensure your repository is on GitHub. After pushing, the CI should run automatically if GitHub Actions is enabled for the repository.

## Additional Information

For more information, refer to the documentation for tools used in this project:
- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Ant Design](https://ant.design/)

