Basic Sequelize Example.

Install Sequelize globally
yarn global add sequelize-cli

run: yarn to install dependencies
run: sequelize db:migrate to migrate the database

Setup database config in server/config/config.json in format -

{
    "development": {
        "username": "",
        "password": "",
        "database": "",
        "host": "",
        "dialect": ""
    }
}
