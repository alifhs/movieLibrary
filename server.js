if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err=> console.log(err));

app.use(bodyparser.urlencoded({extended: false}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
 
app.use('/', indexRouter);
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000);

