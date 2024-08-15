import React, { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMovieTrailer = (movieId) => {
    //fetching trailer
    const dispatch = useDispatch();
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTIONS);
        const json = await data.json();

        const trailer = json.results.filter((video) => video.type === "Trailer");
        // console.log(trailer[0]);
        dispatch(addTrailerVideo(trailer[0]));
    };
    useEffect(() => {
        getMovieVideos();
    }, []);

}

export default useMovieTrailer;