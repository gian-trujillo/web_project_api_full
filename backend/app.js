require('dotenv').config();
const express = require('express');
const { celebrate, errors } = require('celebrate');
const cors = require('cors');

const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const { signupValidator, signinValidator } = require('./validators/authValidator');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const { MONGO_URI = 'mongodb://localhost:27017/aroundb' } = process.env;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(cors());
app.use(requestLogger);

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use(express.json());

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
