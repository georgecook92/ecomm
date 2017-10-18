const assert = require('assert');
const User = require('../server/models/').ecomm_user;
const Address = require('../server/models/').address;
const Util = require('./Util');

const SHIPPING_ID = 1;
const BILLING_ID = 2;

describe('Shipping Address *******************************', () => {
    beforeEach(done => {
        Address.destroy({
            where: {},
        }).then(() => done());
    });

    it('Create one shipping address', done => {
        let userId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return Util.createAddress(user.id, SHIPPING_ID);
            })
            .then(() => Address.findOne({ where: { userId: userId } }))
            .then(shippingAddress => {
                assert(shippingAddress.first_line === 'test');
                assert(shippingAddress.second_line === 'address');
                assert(shippingAddress.city === 'city');
                assert(shippingAddress.postcode === 'postcode');
                assert(shippingAddress.userId === userId);
                assert(shippingAddress.addressTypeId === SHIPPING_ID);
                done();
            });
    });

    it('Create multiple shipping addresses', done => {
        let userId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return Util.createAddress(userId, SHIPPING_ID);
            })
            .then(() => Util.createAddress(userId, SHIPPING_ID))
            .then(() => Address.findAll({ where: { userId } }))
            .then(shippingAddresses => {
                assert(shippingAddresses.length === 2);
                done();
            });
    });

    it('Read shipping address', done => {
        let userId;
        let shippingAddressId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return Util.createAddress(userId, SHIPPING_ID);
            })
            .then(shippingAddress => (shippingAddressId = shippingAddress.id))
            .then(() => Address.findById(shippingAddressId))
            .then(shippingAddress => {
                assert(shippingAddress.first_line === 'test');
                assert(shippingAddress.second_line === 'address');
                assert(shippingAddress.city === 'city');
                assert(shippingAddress.postcode === 'postcode');
                assert(shippingAddress.userId === userId);
                assert(shippingAddress.addressTypeId === SHIPPING_ID);
                done();
            });
    });

    it('Create multiple addresses and get shipping addresses', done => {
        let userId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return Util.createAddress(userId, SHIPPING_ID);
            })
            .then(() => Util.createAddress(userId, BILLING_ID))
            .then(() => Address.findAll({ where: { userId, addressTypeId: SHIPPING_ID } }))
            .then(shippingAddresses => {
                assert(shippingAddresses.length === 1);
                done();
            });
    });

    it('Update shipping address', done => {
        let userId;
        let shippingAddressId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return Util.createAddress(userId, SHIPPING_ID);
            })
            .then(shippingAddress => {
                shippingAddressId = shippingAddress.id;
                return Address.update(
                    {
                        first_line: 'test v2',
                        second_line: 'address v2',
                    },
                    {
                        where: {
                            id: shippingAddressId,
                        },
                    }
                );
            })
            .then(() => Address.findById(shippingAddressId))
            .then(shippingAddress => {
                assert(shippingAddress.first_line === 'test v2');
                assert(shippingAddress.second_line === 'address v2');
                assert(shippingAddress.addressTypeId === SHIPPING_ID);
                done();
            });
    });

    it('Delete shipping address', done => {
        let userId;
        let shippingAddressId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return Util.createAddress(user.id);
            })
            .then(shippingAddress => (shippingAddressId = shippingAddress.id))
            .then(() => {
                Address.destroy({
                    where: {
                        id: shippingAddressId,
                    },
                });
            })
            .then(() => Address.findAll())
            .then(addresses => {
                assert(addresses.length === 0);
                done();
            });
    });
});
