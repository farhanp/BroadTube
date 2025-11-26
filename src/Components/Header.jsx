import React, { useEffect, useState } from "react";
import playButton from "../assets/play-button.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faWandSparkles,
  faHome,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { toggleGptResults } from "../utils/gptSlice";

const NavButtons = ({ showGptSearch, handleGPTSearch }) => (
  <div className="flex items-center justify-center border-2 bg-[#7de38e] rounded-lg py-1">
    <button
      onClick={handleGPTSearch}
      className="text-black hover:opacity-90 cursor-pointer gap-2 flex items-center px-4 sm:px-4 py-2 sm:py-1 mr-5 sm:mr-0 rounded-lg max-h-10 text-lg sm:text-md"
    >
      {!showGptSearch ? (
        <FontAwesomeIcon
          size="md"
          icon={faWandSparkles}
          className="text-black"
        />
      ) : (
        <FontAwesomeIcon size="md" icon={faHome} className="text-white" />
      )}
      <span className="font-bold">{!showGptSearch ? "AI Search" : "Home"}</span>
    </button>
  </div>
);

const UserInfo = ({ handleSignOut }) => (
  <div className="flex items-center justify-center rounded-lg py-1">
    <button
      onClick={handleSignOut}
      type="button"
      className="text-lg flex gap-2 items-center sm:text-md max-h-10 font-bold cursor-pointer text-red-400 sm:px-6 py-2 sm:py-1 px-4 sm:ml-auto"
    >
      <FontAwesomeIcon size="md" icon={faUser} className="text-red-400" />
      <div className="font-bold sm:max-h-6.5">Sign out</div>
    </button>
  </div>
);

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [hideBurgerMenu, setHideBurgerMenu] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            name: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        navigate("/");
        dispatch(removeUser());
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        console.log("Error:", error);
        navigate("/error");
      });
  };

  const toggleBurgerMenu = () => {
    setHideBurgerMenu(!hideBurgerMenu);
  };

  const handleGPTSearch = () => {
    dispatch(toggleGptResults());
    setHideBurgerMenu(false);
  };

  return (
    <div className="flex container mx-auto justify-start items-center gap-0.5 px-4 py-4">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/browse")}
      >
        <img className="w-9 sm:h-9" src={playButton} alt="Play button logo" />
        <h1 className="text-emerald-400 text-3xl">broadTube</h1>
      </div>
      {user && (
        <div className="flex items-center ml-auto">
          <div className="sm:hidden">
            <FontAwesomeIcon
              size="xl"
              type="button"
              icon={faBars}
              className="text-emerald-400"
              onClick={toggleBurgerMenu}
            />
            {hideBurgerMenu && (
              <>
                {/* Overlay */}
                <div
                  onClick={toggleBurgerMenu}
                  className="fixed inset-0 bg-gray-500 bg-opacity-70 z-50 animate-fadeIn"
                ></div>

                {/* Sidebar */}
                <div className="fixed top-0 right-0 left-20 h-screen bg-gray-900 z-52 animate-slideIn">
                  <div className="m-4 p-4 pt-10 flex flex-col gap-8 justify-center">
                    <NavButtons
                      showGptSearch={showGptSearch}
                      handleGPTSearch={handleGPTSearch}
                    />
                    <UserInfo handleSignOut={handleSignOut} />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="hidden sm:flex">
            <NavButtons
              showGptSearch={showGptSearch}
              handleGPTSearch={handleGPTSearch}
            />
          </div>
          <div className="hidden sm:flex">
            <UserInfo handleSignOut={handleSignOut} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
