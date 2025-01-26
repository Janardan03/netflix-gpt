import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {

    const gpt = useSelector((store) => store.gpt);
    const {movieNames, movieResults} = gpt;

    if(!movieNames) return null;

    return (
        <div className="p-4 m-4 bg-black text-white opacity-80">
            <div>
                {movieNames.map((movieName, idx) => <MovieList key={movieName} title={movieName} movies={movieResults[idx]}/>)}
            </div>
        </div>
    );
}

export default GptMovieSuggestions;