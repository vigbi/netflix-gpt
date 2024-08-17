import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        
        dispatch(
          addUser({
            uid:uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  },[])

  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange=(e)=>{
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />

      {user && (<div className='flex p-2 justify-between' >
        {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white"
                 onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hindi">Hindi</option>
        </select>)}
        <button onClick={handleGptSearchClick}className='text-white'>
          {showGptSearch ? "Homepage" : "GPT Search"}
        </button>
        <img className='h-12 w-12 flex justify-between' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="user-icon" />
        <button onClick={handleSignOut} className='font-bold text-white pl-2'> Sign out</button>
      </div>
      )}

    </div>
  );
};

export default Header