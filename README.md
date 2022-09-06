# Storefront Backend Project
## Development server
Run `npm run watch` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Running unit tests
Run `npn run test` to execute the unit tests via [Jasmine].

## Migrate Database Up
Run `npm run db-up`

## Migrate Database Down
Run `npm run db-down`
## Environment variables
PORT=3000
DATABASE_PORT= 5432
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=ecommerce
POSTGRES_DB_TEST=ecommerce_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Honda
SALT_ROUND=10
TOKEN_SECRET=mohand.abdalrahman
ENV=dev
