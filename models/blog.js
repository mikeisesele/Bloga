const mongoose = require('mongoose');

// our model is built upon this schema. basicaly its our entity / class.
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
},{
    // generate time stamp for our blog post.
    timestamps: true
});

// model is the instance of our schema.
// the 'Blog' in the model method is the name of the collection in our mongodb.
// mongoose will pluralize the name of the model. and use the lowercase to search for the collection. 
// the 'blogSchema' in the model method is the type of model structured based on our schema we want to store in our collection
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;