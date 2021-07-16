const Blog = require('../models/blog')

// get all blogs
const blog_index = (req, res) => {
    Blog.find()
    .then((blogs) => {
      res.render('index', { title: 'All Blogs', blogs: blogs });
    })
    .catch((err) => {
      console.log(err);
    })
}

// get blog details
const blog_details = (req, res) => {
    Blog.findById(req.params.id)
    .then((blog) => {
      res.render('details', { title: 'Blog Details', blog: blog })
    })
  
    .catch((err) => {
      console.log(err);
    })
}

// view blogs
const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a new blog' });
}

// create new blog
const blog_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
    .then((blog) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
}

// delete blog
const blog_delete = (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
    .then((blog) => {
        // we cannot use res.redirect here because the blog is not in the database. its an Ajax request and redirect 
        // will only work from the front end
        // res.redirect('/blogs');
        res.json({ 
        message: 'Blog deleted',
        redirect: '/blogs' 
        });    
    })
    .catch((err) => {
        console.log(err);
    })
}


module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_post,
  blog_delete
}
