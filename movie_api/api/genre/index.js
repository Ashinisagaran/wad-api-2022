import express from 'express';
import Genres from './genreModel';

const router = express.Router(); // eslint-disable-line

// Get all genre
router.get('/', async (req, res) => {
    const genres = await Genres.find();
    res.status(200).json(genres);
});



export default router;