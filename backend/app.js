const express = require('express');
const cors = require('cors');
const { celebrate, errors } = require('celebrate');

const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const { signupValidator, signinValidator } = require('./validators/authValidator');
// const validator = require('./middlewares/validate');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(requestLogger);

app.use(cors());

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Request received:', req.method, req.url);
//   next();
// });

app.post('/signin', celebrate({ body: signinValidator }), login);
app.post('/signup', celebrate({ body: signupValidator }), createUser);

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.use(errors());

app.use(errorLogger);

app.use(error.errorHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server at http://localhost:${PORT}`);
});
