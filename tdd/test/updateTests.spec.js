const assert = require('assert');
const User = require('../src/models/user');

describe('Updating Records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });
        joe.save().then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({})) // get all users
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }


    it('instance type using set and save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('instance type using update', done => {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('class type using update', (done) => {
        // NOTE: updates all cases where name === 'Joe'
        assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
    });


    it('class type using findOneAndUpdate', (done) => {
        // NOTE: finds first case and only updates that        
        assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
    });

    it('class typew using findByIdAndUpdate', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
    });

    it('A user can have their likes increments by one using increment operator', (done) => {
        User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
            .then(() => User.findOne({ name: 'Joe' }))
            .then(user => {
                assert(user.likes === 10);
                done();
            });
    });
});