import { CDN_IMG_URL } from "../utils/constants";

const MovieCard = ({posterPath}) => {
  
  if(!posterPath) return null;
  
  return (
    <div className="w-36 md:w-48 p-2">
        <img alt="movie card" src={CDN_IMG_URL + posterPath}/>
    </div>
  )
}

export default MovieCard;