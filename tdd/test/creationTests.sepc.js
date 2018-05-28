const assert = require('assert');
const User = require('../src/models/user');

describe('Creating Records', () => {
    it('saves a user record', (done) => {
        let joe = new User({
            name: 'Joe',
            posts: [{ title: 'Hello World' }]
        });

        assert(joe.isNew); // should be a new record

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                assert(!joe.isNew)
                assert(user.name === 'Joe');
                assert(user.posts.length === 1);
                assert(user.posts[0].title === 'Hello World');

                done();
            });
    });
});