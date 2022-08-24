import './db';
// replace existing import with passport strategy​
import passport from './authenticate';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import genresRouter from './api/genre';
import './seedData';
import usersRouter from './api/users';
import session from 'express-session';


dotenv.config();

const app = express();

const port = process.env.PORT;

const errHandler = (err, req, res, next) => {
    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if(process.env.NODE_ENV === 'production') {
      return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
  };

// replace app.use(session([... with the following:
app.use(passport.initialize());
  

app.use(express.json());

//Movies router
// Add passport.authenticate(..)  to middleware stack for protected routes​
// app.use('/api/movies', moviesRouter);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);

//eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M :-
// {
//     "username": "user1",
//     "password": "test1"
// }

//Genres router
app.use('/api/genres', genresRouter);

//Users router
app.use('/api/users', usersRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});