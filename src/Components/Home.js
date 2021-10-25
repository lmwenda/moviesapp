import React, { useState, useEffect } from "react";
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./useDarkMode"
import { GlobalStyles } from "../globalStyles";
import { lightTheme, darkTheme } from "../Theme"
import Toggle from "./Toggler";
import { Col } from "react-bootstrap";
import { Grid } from "@mui/material";
import axios from "axios"; // for testing purposes
import "./Home.css";
import Movie from "./Movies";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';

function Home(){
    const [ movies, setMovies ] = useState([]);
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    useEffect(() => { 
        async function getMovies(){
            const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie',{
                params:{
                    api_key: "90086cea7ab5b239ce3996ec57a6368a"
                }
            });
            setMovies(data.results);
        }

        getMovies();
    }, [])


    if(!mountedComponent) return <div/>

    return(
        <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
            <div className="App">

            <header>
                <h1>Discover</h1>
            </header>

            <div className="theme">
                Theme <Toggle toggleTheme={themeToggler} />
            </div>

            <div style={{ height: 400, width: '100%' }}>                    
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {movies.map(movie => (
                        <Grid item xs={6} key={movie.id} sm={12} md={6} lg={4} xl={3}>
                            <Movie movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </div>

            </div>
        </ThemeProvider>
    );
}

export default Home;