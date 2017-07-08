# node-boilerplate
boilerplate for future applications

## react frontend

### run
npm install
docker build -t boilerplate-db server/db .
docker run -p 127.0.0.1:5432:5432 --name <containerid> -t boilerplate-db
create a database named node-security
run knex migrate:latest

### run tests
npm test

### run server
nodemon

### run client
webpack --progress --colors --watch

## database
Docker file for db based on POSTGRES Docker
expose port and run with:
docker start <dbname>

### migrations
knex migrate:make migration_name

knex migrate:latest