import './db';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genre';
import './seedData';
import usersRouter from './api/users';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

//Movies router
app.use('/api/movies', moviesRouter);

//Genres router
app.use('/api/genres', genresRouter);

//Users router
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});