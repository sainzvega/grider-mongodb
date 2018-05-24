const assert = require('assert');
const User = require('../src/models/user');

describe('User Model', function () {
    describe('Creation Tests', function () {
        it('should save a user', function (done) {
            const joe = new User({
                name: 'Joe'
            });

            joe.save().then((result) => {
                assert(!joe.isNew);
                done();
            });
        });
    });
});