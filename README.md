## Getting Started

To initialize the project with docker and to seed initial data run `./build.sh` inside project directory.
Initial admin credential: admin@admin.com - 123

### Seeders

- An admin
- 30 normal users
- 30 products
- 30 orders
  Faker used to fill out the data.

### Authentication

- Used JWT token with `['admin', 'user']` scopes.
- Created `AuthGuard` to protect routes.

### Validation & Serialization

Validation on DTO's and `Exclude` transformer for password.

### Postman Collection

In main directory `Task.postman_collection.json`

### Testing

Couldn't integrate test database to e2e test.
