import React from "react";
import "./Header.css";

function Header() {
  return (
    <div onClick={() => window.scroll(0, 0)} className="Header">
      🎥 Book My Show MovieDb 🎫{" "}
    </div>
  );
}

export default Header;
