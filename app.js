var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

var User = require('./models/user');
var Novel = require('./models/novel');
var Friend = require('./models/friend');
var Good = require('./models/good');
var Comment = require('./models/comment');
var Post = require('./models/post');

User.sync().then(() => {
  Post.belongsTo(User, { foreignKey: 'createdBy' });
  Post.sync();
  Friend.belongsTo(User, { foreignKey: 'followId'});
  Friend.belongsTo(User, { foreignKey: 'followedId' });
  Friend.sync();
  Good.belongsTo(User, { foreignKey: 'userId' });
  Comment.belongsTo(User, { foreignKey: 'createdBy' });
  Novel.belongsTo(User, { foreignKey: 'createdBy' });
  Novel.sync().then(() => {
    Good.belongsTo(Novel, { foreignKey: 'novelId' });
    Good.sync();
    Comment.belongsTo(Novel, { foreignKey: 'novelId' });
    Comment.sync();
  });
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      where: { username: username }
    }).then((user) => {
      if (!user) {
        return done(null, false);
      } else if (user.password !== password) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  }
));

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var novelRouter = require('./routes/novels');
var goodRouter = require('./routes/goods');
var commentRouter = require('./routes/comments');
var userRouter = require('./routes/users');
var friendRouter = require('./routes/friends');

var app = express();
app.use(helmet());
app.use(session({ secret: "e0ca40ea8f0564f1", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/friends', friendRouter);
app.use('/novels', novelRouter);
app.use('/novels', goodRouter);
app.use('/novels', commentRouter);
app.post('/login',
  csrfProtection,
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function (req, res, next) {
    var loginFrom = req.cookies.loginFrom;
    if (loginFrom &&
      !loginFrom.includes('http://') &&
      !loginFrom.includes('https://')) {
      res.clearCookie('loginFrom');
      res.redirect(loginFrom);
    } else {
      res.redirect('/');
    }
  }
);
app.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
