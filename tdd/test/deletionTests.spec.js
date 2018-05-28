const assert = require('assert');
const User = require('../src/models/user');

describe('Deleting existing records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save().then(() => done());
    });
    
    it('removes using model instance', (done) => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

    it('removes using class method', (done) => {
        User.remove({ name: 'Joe'}) // NOTE: removes all with name Joe
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

    it('removes using class method findOneAndRemove', (done) => {
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user === null);
                done();
            });
    });

    it('removes using class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(joe._id) // joe_id === object but mongoose knows how to work with it
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user === null);
                done();
            });
    });
});