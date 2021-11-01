import React, { useEffect } from "react";
import { CardStyles, GlobalStyles } from "../globalStyles";
import axios from "axios";
import {ThemeProvider} from "styled-components";
import { useDarkMode } from "./useDarkMode";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { lightCardTheme, darkCardTheme } from "../Theme";

function Movie({ movie }){
    const IMG_API = "https://image.tmdb.org/t/p/w1280";
    const [ theme, mountedComponent ] = useDarkMode();
    const themeMode = theme === 'light' ? lightCardTheme : darkCardTheme;

    if(!mountedComponent) return <div/>

    return(
        <ThemeProvider theme={themeMode}>
            <Card id="card" className="my-3 p-2 rounded" style={{
                background: theme === "dark" ? "#2d4f85" : "#fff"
            }}>
                
                <Link to={`/movie/${movie.id}`}>
                    <Card.Img src={IMG_API + movie.poster_path} />
                </Link>

                <Card.Body>
                <Link to={`/movie/${movie.id}`}>
                    <Card.Title>
                        <strong style={{ color: "#fff", fontWeight: "500"}}>
                            {movie.title}
                        </strong>
                    </Card.Title>

                    <Card.Title>
                        <strong style={{ color: "#fff", fontWeight: "500"}}>
                            Released: {movie.release_date}
                        </strong>
                    </Card.Title>
                </Link>

                </Card.Body>
            </Card>
        </ThemeProvider>
    );
}

export default Movie;