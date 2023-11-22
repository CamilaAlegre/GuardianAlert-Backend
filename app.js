const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require("jsonwebtoken");
const mongodb=require('./database/connection');
const contactsModel = require('./models/contactModel');
const usersModel = require('./models/userModel');
const eventsModel = require('./models/eventModel');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routers/indexRoutes');
const usersRouter = require('./routers/usersRoutes');
const contactsRouter = require('./routers/contactsRoutes');
const eventsRouter = require('./routers/eventRoutes');
const dataRouter = require('./routers/dataRoutes');
const fallDetectionRoutes = require('./routers/neuronalNetworkFallRoutes'); 

const port = 3000;
const app = express();

app.set("secretKey",process.env.SECRET_KEY);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
app.use('/events', eventsRouter);
app.use('/data', dataRouter);
app.use('/fall-detection', fallDetectionRoutes); 

app.use(cors()); 

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, req.app.get("secretKey"), function (error, payload) {
      if (error) {
        return res.status(401).json({ message: error.message });
      } else {
        console.log(payload);
        next();
        return;
      }
    });
  } else {
    return res.status(401).json({ message: "Token must be provided" });
  }
}

app.verifyToken = verifyToken;
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json(err.message);
});
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;