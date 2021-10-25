import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Movie({ movie }){
    const IMG_API = "https://image.tmdb.org/t/p/w1280";

    return(
        <Card className="my-3 p-2 rounded">
            <Link to={`/movie/${movie.id}`}>
                <Card.Img src={IMG_API + movie.poster_path} />
            </Link>

            <Card.Body>
            <Link to={`/movie/${movie.id}`}>
                <Card.Title>
                    <strong>{movie.title}</strong>
                </Card.Title>
            </Link>

            <Card.Text as="h3" style={{color: '#000', textDecoration: 'none'}}>
                
            </Card.Text>

            </Card.Body>
        </Card>
    );
}

export default Movie;