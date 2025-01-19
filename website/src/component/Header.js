import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router";

function Header() {
  return (
    <header className="bg-bg-header w-full text-white flex justify-between px-5 items-center mb-5">
      <div className="flex flex-row items-center gap-10">
        <Link href="/" className="text-xl font-bold">
          🦈steamShark
        </Link>
        <nav className="flex flex-row gap-3">
          <Link to="/">Home</Link>
          <Link to="/changelog">Changelog</Link>
        </nav>
      </div>
      <div className="flex flex-row items-center">
        <ThemeSwitcher />
        <a
          href="https://github.com/Franciscoborges2002/ASteamShark"
          target="_blank"
          className="text-lg font-semibold transition-all delay-50 text-purple-500 hover:text-purple-600 hover:underline"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </header>
  );
}

export default Header;
