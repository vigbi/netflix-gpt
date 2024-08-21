import React from 'react'
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from '../utils/openai';
import { useRef } from "react";
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => { 
  const dispatch=useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText=useRef(null);

  //search in tmdb
  const searchMovieTMDB=async(movie)=>{
    const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);
    const json=await data.json();

    return json.results;
  }

  const handleGptSearchClick= async()=>{

    const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query : " +
                    searchText.current.value +
                   ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await client.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    console.log(gptResults.choices)
    console.log(gptResults.choices?.[0]?.message?.content); //movie1,movie2,movie3
    const gptMovies=gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray=gptMovies.map(movie=>searchMovieTMDB(movie));
    //The above line of code returns me 5 promises. As api call takes time re resolve.
    const tmdbResults=await Promise.all(promiseArray);
    dispatch(addGptMovieResult({movieNames:gptMovies, movieResults: tmdbResults}));

  }

  return (
    <div className="pt-[10%] flex justify-center">
        <form className='w-1/2 bg-black grid grid-cols-12'
               onSubmit={(e)=>e.preventDefault()}>
            <input type="text" className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder} 
             ref={searchText}/>
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
                     onClick={handleGptSearchClick}
                    >
              {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar;