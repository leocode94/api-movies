import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api_key } from "../../config/key"
import { Container } from "./styles"

export default function Details() {

    const { id } = useParams()
    const [movie, setMovie] = useState({})
    const image_path = "https://image.tmdb.org/t/p/w500"

    useEffect(() => {
        const fetch = require('node-fetch');
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${api_key}`
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                const { title, poster_path, overview, release_date } = data
                const movie = {
                    id,
                    title,
                    sinopse: overview,
                    image: `${image_path}${poster_path}`,
                    releaseDate: release_date
                }
                setMovie(movie)
                console.log(movie)
            }
            )
            .catch(err => console.error('error:' + err));


    }, [id])

    return (
        <Container>
            <div className="movie">
                <img src={movie.image} alt={movie.sinopse}/>
                <div className="details">
                    <h1>{movie.title}</h1>
                    <span>Sinopse: {movie.sinopse}</span>
                    <span className="release-date">Release date: {movie.releaseDate}</span>
                    <Link to="/"><button>GO BACK</button></Link>
                </div>
            </div>
        </Container>
    )
}