# node-boilerplate
boilerplate for future applications

## react frontend

### run
npm install

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