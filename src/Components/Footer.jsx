import React from "react";

const Footer = () => {
  console.log("footer");
  return (
    <div className="text-emerald-400 p-5 text-center w-max mx-auto shadow-lg">
      Made with <span className="text-red-400">&hearts;</span> by Mohamed Farhan{" "}
      {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
