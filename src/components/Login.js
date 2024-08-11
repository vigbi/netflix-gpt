import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
import { updateProfile } from "firebase/auth";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // console.log(email.current.value,password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message)
      return;

    // signIn/signUp logic
    if (!isSignInForm) {
      // signUp logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user)
            .then(() => {
              // Profile updated!
            }).catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " + ", errorMessage);
          // ..
        });
    }

    else {
      // signIn logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, " + ", errorMessage);
        });
    }

  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />

      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg" alt="" />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 text-lg absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-85'>

        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (<input ref={name} type='text' placeholder='Full name'
          className='p-3 my-4 w-full bg-gray-700' />)
        }

        <input ref={email} type='text' placeholder='Email'
          className='p-3 my-4 w-full bg-gray-700' />

        <input ref={password} type='password' placeholder='Password'
          className='p-3 my-4 w-full bg-gray-700' />

        <p className='text-red-500 font-bold text-base py-2'>{errorMessage}</p>

        <button className='p-3 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className='py-4 text-base cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now!" : "ALready registered? Sign In now"}</p>
      </form>
    </div>
  )
}
//vigbi exp
export default Login 