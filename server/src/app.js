const express = require('express')
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser')

require('dotenv').config({
  path: process.env.DOTENV || '.env'
})

const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')



const app = express()
//app.use(express.static('../../client/dist'));

app.use(morgan('combined'))

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
//   extended: true
// }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}));
const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// require('./config/passport');
require('../../lib/dbConnection')(mongoose)

//Models & routes
// require('./models/Users');
// require('./config/passport');
app.use(require('./routes'));
// app.use('/api/posts', posts);
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  log.debug('%s %d %s', req.method, res.statusCode, req.url);
  res.json({
    error: 'Not found'
  });
  return;
});

// Error handlers

if (app.get('env') === 'development') {
  //   app.use(function (err, req, res, next) {
  //     res.status(err.status || 500);
  //     console.error('%s %d %s', req.method, res.statusCode, err.message);
  //     res.json({
  //       method: req.method,
  //       uri: req.protocol + '://' + req.get('Host') + req.url,
  //       statusCode: res.statusCode,
  //       error: err.message
  //     });
  //     return;
  //   });
  // }
  // if (app.get('env') === 'development') {
  //   // catch 404 and forward to error handler
  //   app.use((error, req, res, next) => {
  //     res.status(error.status || 500).send({
  //       error: {
  //         status: error.status || 500,
  //         message: error.message || 'Internal Server Error',
  //       },
  //     });
  //   });
  if (process.pid) {
    console.log('This process is your pid ' + process.pid);
  }
}




// app.use('/', posts)

// app.get('/post/:id', (req, res) => {

//   Post.findById(req.params.id, 'title description', function (error, post) {
//     if (error) {
//       console`.error(error);
//     }
//     res.send(post)
//   })
// })

// catch 404 and forward to error handler


//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.listen(process.env.PORT || 8081)