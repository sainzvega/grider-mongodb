const assert = require('assert');
const User = require('../src/models/user');

describe('Reading items from the database', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        alex = new User({ name: 'Alex' });
        zach = new User({ name: 'Zach' });

        Promise.all([joe.save(), maria.save(), alex.save(), zach.save()])
            .then(() => done());        
    });

    it('finds all users with the name of joe', (done) => {
        User.find({ name: 'Joe'})
            .then(users => {
                assert(users.length === 1);                
                // assert(users[0]._id === joe._id); // no same object ref. Must convert to string
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            })
    });

    it('finds a user with a particular id', (done) => {
        User.findById(joe._id)
            .then(user => {
                assert(user !== null);
                assert(user.name === 'Joe');
                done();
            });
    });    
});