const express = require('express');
const router = express.Router();
const Movie = require('./../models/Movie');

router.get('/', async (req, res) => {
    let movies = await Movie.find({});
    res.json(movies);
})
router.post('/', async (req, res) => {
    let movieData = req.body;
    let movie = new Movie(movieData);
    await movie.save();

    res.json(movie);
})
router.put('/:movie_id', async (req, res) => {
    let movieData = req.body;
    let movie = await Movie.findById(req.params.movie_id);
    movie.name = movieData.name
    movie.description = movieData.description
    movie.save();
    res.json(movie);
})
router.delete('/:movie_id', async (req, res) => {
    let movie = await Movie.findById(req.params.movie_id);
    await movie.remove();
    res.json({success:true});
})
router.get('/:movie_id', async (req, res) => {
    let movie = await Movie.findById(req.params.movie_id);

    res.json(movie);
});

module.exports = router;