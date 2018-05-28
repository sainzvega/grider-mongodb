const assert = require('assert');
const User = require('../src/models/user');

describe('Validating Records', () => {
    it('requires a user name', () => {
        let user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required.');
    });

    it('requires a name with more than 2 chars', () => {
        let user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from being saved', (done) => {
        let user = new User({ name: undefined });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name is required.');

                done();
            });
    });
});