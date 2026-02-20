# Unit Testing Projects

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
<!-- ![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white) -->
![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=for-the-badge&logo=vitest&logoColor=white)
<!-- ![xUnit](https://img.shields.io/badge/xUnit-512BD4?style=for-the-badge&logo=dotnet&logoColor=white) -->

## Overall Goal

This repository is a dedicated learning environment for mastering **Test-Driven Development (TDD)** and unit testing best practices. It contains isolated, standalone projects built across different languages and frameworks to practice specific testing mechanics—from pure logic and state management.

---

## Project Index

Each project in this repository is completely self-contained with its own dependencies and testing environment. Click on a project name to view its specific code and README.

| Project                                     | Language / Tech   | Testing Framework | Key Concepts Mastered                                            |
| :------------------------------------------ | :---------------- | :---------------- | :--------------------------------------------------------------- |
| [**Shopping Cart**](./shopping-cart/)       | TypeScript / Node | Vitest            | State management, error boundaries, TDD lifecycle (`beforeEach`) |
| [**Bank Account Manager**](./bank-manager/) | TypeScript / Node | Vitest            | Multi-state updates, strict business logic enforcement           |

---

## Getting Started

Because this repository contains distinct projects, you must navigate into a specific project's directory before installing dependencies or running tests.

### For TypeScript / Node Projects (Vitest)

1. Navigate to the project folder: `cd shopping-cart`
2. Install dependencies: `npm install`
3. Run the test suite: `npm run test`

---

## Core Concepts Practiced

Throughout these projects, the following testing principles are rigorously applied:

- **The TDD Cycle:** Red (write a failing test) -> Green (write the minimum code to pass) -> Refactor (clean up the code).
- **Isolation:** Ensuring tests do not rely on one another or share corrupted state.
- **Encapsulation:** Testing public behaviors and outputs, not private internal implementations.
- **Arrange, Act, Assert (AAA):** Structuring tests logically for maximum readability.
