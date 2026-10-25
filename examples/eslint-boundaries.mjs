// ESLint flat-config fragment that enforces the layers. Adjust globs and aliases to your project.
// Usage: spread into your exported config array.

export const boundaryRules = [
  // 1. After the migration, nothing may import Redux or Saga.
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        paths: [
          { name: "redux", message: "Server state belongs to React Query." },
          { name: "react-redux", message: "Server state belongs to React Query." },
          { name: "redux-saga", message: "Sagas were removed; use service hooks." },
          { name: "redux-saga/effects", message: "Sagas were removed; use service hooks." },
        ],
      }],
    },
  },

  // 2. UI components must not reach the HTTP client or raw API calls.
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["@/lib/http"], message: "Use a service hook, not the HTTP client." },
          { group: ["@/apiServices/*/apiCalls"], message: "Call the service hook instead." },
        ],
      }],
    },
  },

  // 3. API call modules stay free of React and caching.
  {
    files: ["src/apiServices/**/apiCalls.ts"],
    rules: {
      "no-restricted-imports": ["error", {
        paths: [
          { name: "react", message: "apiCalls must be stateless." },
          { name: "@tanstack/react-query", message: "Caching belongs in service.ts." },
        ],
      }],
    },
  },

  // 4. Helpers are pure.
  {
    files: ["src/apiServices/**/helpers.ts"],
    rules: {
      "no-restricted-imports": ["error", {
        paths: [
          { name: "react", message: "helpers must be pure." },
          { name: "@/lib/http", message: "helpers must not perform I/O." },
        ],
      }],
    },
  },
];

// Tip: roll these out as "warn" first, fix violations, then promote to "error".
