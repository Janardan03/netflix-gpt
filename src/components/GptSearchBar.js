import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {

  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const url = "https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1";
    const data = await fetch(url, API_OPTIONS);

    const json = await data.json();

    return json.results;
  }

  const handleGptSearchClick = async () => {
    const gptQuery = "Act as a movie recommendation system and suggest some movies for the query : " 
                      + searchText.current.value + ". only give me name of 5 movies, comma separated like the example result given ahead. Example result: gadar, sholay, phir hera pheri, don, golmaal";

    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: gptQuery }],
    //   model: 'gpt-3.5-turbo',
    // });

    // i'm not making live api call due to unsufficient credits.
    const gptResults = ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"];
    
    const promiseArray = gptResults.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({movieNames: gptResults, movieResults: tmdbResults}));
  }

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg" onSubmit={(e) => e.preventDefault()}>
        <input ref={searchText} type="text" placeholder={lang[langKey].gptSearchPlaceHolder} className="p-4 m-4 col-span-9 rounded-lg"/>
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
};

export default GptSearchBar;