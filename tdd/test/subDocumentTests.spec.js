const assert = require('assert');
const User = require('../src/models/user');

describe('SubDocument Tests', () => {
    it('can create a subdocument', (done) => {
        let joe = new User({
            name: 'Joe',
            posts: [{ title: 'This is a Post' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.posts[0].title === 'This is a Post');
                done();
            });
    });

    it('can add sub documents to existing records', (done) => {
        let joe = new User({ 
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                user.posts.push({ title: 'PostTitle'});
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('can remove and existing sub document', (done) => {
        let joe = new User({
            name: 'Joe',
            posts: [{ title: 'RemoveMe'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                assert(user.posts.length === 0);
                done();
            });
    });
});