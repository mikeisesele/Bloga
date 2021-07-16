const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoute');


// express app
const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://dbMichael:mongopassword1234@cluster0.p8jho.mongodb.net/node-blog-tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useUnifiedTopology: true,  useNewUrlParser: true} )
.then((result) => 

 // listen for requests
 app.listen(3000) ,
 console.log('Connected to MongoDB')
  
 )
.catch((err) => console.log('Error connecting to MongoDB', err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(morgan('dev'));

app.use((req, res, next) => {
  const request = {
    path: req.path,
    method: req.method,
    host: req.hostname,
  }
  console.log('new request made:');
  console.log('request: ', request);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});


app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// handle home route
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// handle about route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog route applies all the handlers to the app
// app.use(blogRouter)

// scope the blogRouter to the /blogs path
app.use('/blogs', blogRouter);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});