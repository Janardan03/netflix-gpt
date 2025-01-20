import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice"

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
      navigate("/error");
    });
  }

  useEffect(() => {
    // this is an event listener, which needs to be called once
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          const {uid, email, displayName} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName}));
          //navigate("/browse");
      } else {
          dispatch(removeUser());
          //navigate("/");
        }
      });

      // unSubscribe when the component unmounts
      return () => unSubscribe();

    }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLangaugeChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute px-6 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between">
        <img
          className="w-48" 
          src={LOGO}
          alt="logo"/>
        {/* {user && <div className="flex">
          <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg">GPT Search</button>
          <img className="w-11 h-11 self-center m-2 rounded-lg" alt="userIcon" src={USER_AVATAR}/>
          <button className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</button>
        </div>} */}
        <div className="flex">
          {showGptSearch && <select className="p-2 bg-gray-900 text-white my-4" onChange={handleLangaugeChange}>
            {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button className="px-4 mx-4 my-4 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="w-11 h-11 self-center m-2 rounded-lg" alt="userIcon" src={USER_AVATAR}/>
          <button className="font-bold text-white" onClick={handleSignOut}>(Sign Out)</button>
        </div>
    </div>
  )
};

export default Header;