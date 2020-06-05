const { Actors } = require('../models/actor-model')
const { Movies } = require('../models/movie-model')

function errorHandler(req, res, next) {
    const id = req.params.movie_ID
    const bodyId = req.body.id

    if (!bodyId || bodyId.length === 0) {
        return res.status(406).send("Id is missing in the body of the request.")
    }

    if (!id || id.length === 0 || bodyId != id)  {
        return res.status(409).send("id and movie_ID do not match")
    }

    const { firstName, lastName } = req.body
    if (!firstName || !lastName) {
        return res.status(403).send("You need to send both firstName and lastName of the actor to remove from the movie list")
    }

    return Actors.getActorByName(firstName, lastName)
        .then(results => {
            if (!results) {
                return res.status(404).send("The actor or movie does not exist")
            }

            Movies.getMovieByID(id).then(movie => {
                if (!movie) {
                    return res.status(404).send("The actor or movie does not exist")
                } else {
                    req.actorId = results.actor_ID
                    req.movie = movie
                    next()
                }
            })

        })
}

module.exports = errorHandler;