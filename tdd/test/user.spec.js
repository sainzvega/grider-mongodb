const assert = require('assert');
const User = require('../src/models/user');

describe('User Model', function () {
    describe('Creation Tests', function () {
        it('should save a user', function (done) {
            const joe = new User({
                firstName: 'Joe',
                lastName: 'Smith',
                age: 25
            });

            joe.save().then((result) => {
                console.log('===================');
                console.log('Test if something is returned', result);
                console.log('===================');

                assert(!joe.isNew);
                done();
            });
        });
    });
});