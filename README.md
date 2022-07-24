#### Set Up Postgres
- To start docker:
    -docker-compose up
- To run postgres:
    - docker exec -ti store_front_project-postgres-1 psql -U storeFront_user
- Create the user on postgres:
    - CREATE USER storeFront_user WITH PASSWORD 'password123';
- Create database of dev and test:
    - CREATE DATABASE storefront_dev;
    - GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO storeFront_user;
    - CREATE DATABASE storefront_test;
    - GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storeFront_user;
- Run the command: npm run up --> for running the db-migrate up

#### .env file
- The content of the .env file should be:
POSTGRES_HOST = 127.0.0.1
POSTGRES_DATABASE = storefront_dev
POSTGRES_DATABASE_TEST = storefront_test
POSTGRES_USER = storeFront_user
POSTGRES_PASSWORD = password123
ENV = dev
BCRYPT_PASSWORD = my-secret-password
SALT_ROUNDS = 10
SECRET_TOKEN=storefrontbackend

### test and run the code
- Run the following commands:
    - `npm run test` --> for building the project and then run the tests
    - `npm run start`