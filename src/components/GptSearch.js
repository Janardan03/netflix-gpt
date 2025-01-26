import { BG_IMG } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"


const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="w-screen h-screen object-cover" src={BG_IMG}/>
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  )
}

export default GptSearch