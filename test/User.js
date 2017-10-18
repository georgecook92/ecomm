const assert = require('assert');
const User = require('../server/models/').ecomm_user;
const Util = require('./Util');

describe('User *******************************', () => {
    beforeEach(done => {
        User.destroy({
            where: {},
        }).then(() => done());
    });

    it('Create user', done => {
        Util.createUser().then(user => {
            assert(user.first_name === 'George');
            assert(user.password === '12345678');
            done();
        });
    });

    it('Read user', done => {
        Util.createUser()
            .then(() => {
                return User.findOne({
                    where: {
                        first_name: 'George',
                    },
                });
            })
            .then(user => {
                assert(user.last_name === 'Cook');
                assert(user.email === 'george@fieldmargin.com');
                assert(user.password === '12345678');
                done();
            });
    });

    it('Delete user', done => {
        let userId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                assert(user.first_name === 'George');
                return User.destroy({
                    where: {
                        id: userId,
                    },
                });
            })
            .then(() => User.findAll())
            .then(users => {
                assert(users.length === 0);
                done();
            });
    });

    it('Update user', done => {
        let userId;
        Util.createUser()
            .then(user => {
                userId = user.id;
                return User.update(
                    {
                        first_name: 'George v2',
                        last_name: 'Cook v2',
                    },
                    {
                        where: {
                            id: user.id,
                        },
                    }
                );
            })
            .then(() => User.findById(userId))
            .then(user => {
                assert(user.first_name === 'George v2');
                assert(user.last_name === 'Cook v2');
                assert(user.email === 'george@fieldmargin.com');
                done();
            });
    });
});
