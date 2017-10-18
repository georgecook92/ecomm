const Sequelize = require('sequelize');
const User = require('../server/models/').ecomm_user;
const ShippingAddress = require('../server/models/').shipping_address;

before(done => {
    const sequelize = new Sequelize('ecommtest', 'georgecook', '12345678', {
        host: 'localhost',
        dialect: 'postgres',
    });

    sequelize
        .authenticate()
        .then(() => done())
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
});
