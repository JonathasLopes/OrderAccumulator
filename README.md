# OrderAccumulator

**OrderAccumulator** is a backend application built to handle event accumulation and processing. It is structured to support modularity, scalability, and maintainability. Designed for developers who want clarity in architecture and a strong foundation for extending business logic.

## Description

This project collects and processes order data through a structured backend pipeline. It uses a layered architecture to separate responsibilities clearly: from authentication to database access and business entities. Ideal for technical evaluations and production-ready solutions requiring solid backend patterns.

## Notable Techniques

- **[TypeScript interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)**: Used extensively for type safety and contract enforcement across modules.
- **[Dependency Injection](https://www.typescriptlang.org/docs/handbook/decorators.html)**: Simplifies testing and enhances modularity, especially in the service and repository layers.
- **[HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)**: Explicit handling of responses improves API clarity and error diagnosis.
- **Error handling pattern**: Consistent try-catch structure across controllers to isolate logic and surface precise errors.

## Non-obvious Technologies

- **[Zod](https://github.com/colinhacks/zod)**: Schema validation for request payloads, offering developer-friendly syntax and type inference.
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js/)**: Lightweight password hashing utility used in authentication.
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**: For token-based authentication and user session management.

## Fonts

This project does not rely on frontend fonts but could be integrated with the [Roboto Font](https://fonts.google.com/specimen/Roboto) if extended to include a UI.

## Project Structure

```
OrderAccumulator/
├── src/
│   ├── Authentications/
│   ├── Controllers/
│   ├── Database/
│   ├── Entities/
│   ├── Enums/
│   ├── Helpers/
│   ├── Interfaces/
│   ├── Models/
│   ├── Repositories/
│   ├── Types/
│   ├── endpoints.ts
│   ├── global.d.ts
│   └── index.ts
```

### Directory Descriptions

- **Authentications/**: Handles login logic and token validation.
- **Controllers/**: Entry point for HTTP requests, processes input, and returns responses.
- **Database/**: Manages database connection and initialization logic.
- **Entities/**: Contains domain objects representing core data structures.
- **Enums/**: Enumerated types for consistent value sets across the app.
- **Helpers/**: Utility functions shared across modules.
- **Interfaces/**: TypeScript interfaces used throughout the codebase.
- **Models/**: ORM models used for data persistence.
- **Repositories/**: Abstracts database operations, used by services or controllers.
- **Types/**: Contains shared type definitions.
