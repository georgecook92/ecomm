const User = require('../server/models/').ecomm_user;
const Address = require('../server/models/').address;

function createUser() {
    const data = {
        first_name: 'George',
        last_name: 'Cook',
        email: 'george@fieldmargin.com',
        password: '12345678',
    };
    return User.create(data);
}

function createAddress(userId, addressTypeId) {
    const data = {
        first_line: 'test',
        second_line: 'address',
        city: 'city',
        postcode: 'postcode',
        userId,
        addressTypeId,
    };
    return Address.create(data);
}

module.exports = {
    createUser,
    createAddress,
};
