const assert = require('assert');
const User = require('../src/models/user');
const Comment = require('../src/models/comment');
const BlogPost = require('../src/models/blogPost');

describe('Association', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'Test Title', content: 'This is some content' });
        comment = new Comment({ content: 'This is cool' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'Test Title');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })        
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }                
            })
            .then(user => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'Test Title');
                assert(user.blogPosts[0].comments[0].content === 'This is cool');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');

                done();
            });
    });
});