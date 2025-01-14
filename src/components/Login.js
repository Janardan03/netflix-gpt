import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }

  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
  }

  return (
    <div>
        <Header />
        <div className="absolute">
            <img src="https://analyticsindiamag.com/wp-content/uploads/2019/05/apps.55787.9007199266246365.687a10a8-4c4a-4a47-8ec5-a95f70d8852d.jpg"/>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}} className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>}
          <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
          <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignIn ? "Sign In" : "Sign Up"}</button>
          <p className="text-white cursor-pointer" onClick={toggleSignInForm}>
            {isSignIn ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}  
          </p>
        </form>
    </div>
  )
};

export default Login;