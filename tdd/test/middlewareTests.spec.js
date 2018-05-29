const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/models/user");
const BlogPost = require("../src/models/blogPost");

describe("Middleware tests", () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it("removes blog posts associated with user", done => {
    joe
      .remove()
      .then(() => BlogPost.findById(blogPost._id))
      .then(blogPost => {
        assert(blogPost === null);        
        done();
      });
  });
});
