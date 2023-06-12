import { Container, MovieList, Movie } from "./styles"
import { useState, useEffect } from "react"
import { api_key } from "../../config/key"
import { Link } from "react-router-dom"

export default function Home() {

    const [movies, setMovies] = useState([])
    const image_path = "https://image.tmdb.org/t/p/w500"

    useEffect(() => {
        const fetch = require('node-fetch');
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${api_key}`
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(data => setMovies(data.results))
            .catch(err => console.error('error:' + err));
    }, [])

    return (
        <Container>
            <h1>Movies</h1>
            <MovieList>
                {movies.map(movie => {
                    return (
                        <Movie key={movie.key}>
                            <Link
                                to={`/details/${movie.id}`}
                            >
                                <img
                                    src={`${image_path}${movie.poster_path}`}
                                    alt={movie.title}
                                />
                            </Link>
                            <span>{movie.title}</span>
                        </Movie>
                    )
                })}
            </MovieList>
        </Container>
    )
}