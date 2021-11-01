import React, { useState, useEffect } from "react";
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./useDarkMode"
import { GlobalStyles } from "../globalStyles";
import { lightTheme, darkTheme } from "../Theme"
import Toggle from "./Toggler";
import { Grid } from "@mui/material";
import axios from "axios"; // for testing purposes
import "./Home.css";
import Movie from "./Movies";
import AppPagination from "./Pagination";

function Home(){
    // Optimization and User Friendly Experience States
    const [ loading, setLoading ] = useState(false);

    // Movie States
    const [ movies, setMovies ] = useState([]);
    const [ noMovies, setNoMovies ] = useState(false);
    const [ searchMovies, setSearchMovies ] = useState("");

    // Pagination States
    const [numberOfPages, setNumberOfPages] = useState(0);


    // Theme Custom Hookes & Theme Constants
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    useEffect(() => { 
        setLoading(true);

        const page = localStorage.getItem("page");
        if(!page){
            localStorage.setItem("page", 1)
        }
        
        async function getMovies(){
            const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie',{
                params:{
                    api_key: "90086cea7ab5b239ce3996ec57a6368a",
                    page: JSON.parse(localStorage.getItem("page"))
                }
            });
            setMovies(data.results);
            setNumberOfPages(data.total_pages);
            console.log(data);
        }

        getMovies();
        setLoading(false);
    }, [])

    const searchedMovie = async(e) => {
        e.preventDefault();

        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=90086cea7ab5b239ce3996ec57a6368a&query=${searchMovies}`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.results.length === 0) return setNoMovies(true);
                else return setMovies(data.results);
            })
    }


    if(!mountedComponent) return <div/>

    return(
        <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
            <div className="App">

            <header style={{ 
                display: "flex", alignItems: "center", justifyContent: "center"
            }}>
                <h1 style={{paddingRight: "30vw"}}>Discover</h1>

                Theme <Toggle toggleTheme={themeToggler} />
                <form onSubmit={searchedMovie}>
                    <input style={{ 
                        borderRadius: "4px", border: "1px solid #000",
                        padding: "8px"
                    }} type="text" placeholder="Search for Movies:" onChange={(e)=> {
                        setSearchMovies(e.target.value);
                    }} />
                    <input id="search" type="submit" value="Search" />
                </form>
            </header>

            <div style={{ height: 400, width: '100%' }}>  
                {
                    noMovies ? (
                        <h1 style={{textAlign: "center", paddingTop: "50px"}}>
                            Cannot find any movies unfortunately...
                        </h1>
                    ) : (
                        <>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {
                                    loading ? <h1 style={{textAlign: "center", paddingTop: "50px"}}>
                                        Loading...
                                    </h1> : 
                                    movies.map(movie => (
                                        <Grid item xs={6} key={movie.id} sm={12} md={6} lg={4} xl={3}>
                                            <Movie movie={movie} />
                                        </Grid>
    
                                    ))
                                }
                            </Grid>
                            <AppPagination numberOfPages={numberOfPages} />
                        </>
                    )
                }                  
            </div>

            </div>
        </ThemeProvider>
    );
}

export default Home;