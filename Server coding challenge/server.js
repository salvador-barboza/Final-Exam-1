const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandlingMiddleware = require('./middleware/errorHandler')
const {Movies} = require('./models/movie-model')
const app = express();
app.use(jsonParser);
/*
    Your code goes here
*/
app.patch('/api/delete-movie-actor/:movie_ID',
    errorHandlingMiddleware,
    (req, res) => {
    const movieActors = req.movie.actors
    req.movie.actors = req.movie.actors.filter(x => x.actor_ID != req.actorId)
    Movies.removeActorFromMovieList(req.movie.movie_ID, req.actorId).then(movie => {
        res.status(201).json({
            actors: movie.actors
        })
    });
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});