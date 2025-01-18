import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG } from "../utils/constants";

const Login = () => {

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  }

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignIn) {
      // sign up logic

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        
        updateProfile(auth.currentUser, {
          displayName: name.current.value
          }).then(() => {
            
            const {uid, email, displayName} = user.currentUser;
            dispatch(addUser({uid: uid, email: email, displayName: displayName}));

          }).catch((error) => {
            
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });

    } else {
      // sign in logic

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
    }

  }

  return (
    <div>
        <Header />
        <div className="absolute">
            <img src={BG_IMG}/>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}} className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          {!isSignIn && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>}
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