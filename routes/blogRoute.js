const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

//  craete new blog
router.get('/create', blogController.blog_create_get);

// get all blogs
router.get('/', blogController.blog_index)
  
// post a new blog
router.post('/', blogController.blog_post);
  
// get a single blog
router.get('/:id', blogController.blog_details)


// delete a single blog
router.delete('/:id', blogController.blog_delete)
  

module.exports = router;