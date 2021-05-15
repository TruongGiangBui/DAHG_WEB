const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const port = 3000;
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const cookieParser=require('cookie-parser')
const multer = require('multer');
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));
app.use(cookieParser());
app.use(multer().array())
route(app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
