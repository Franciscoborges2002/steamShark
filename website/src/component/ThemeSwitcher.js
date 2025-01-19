import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="p-4">
      <button
        onClick={toggleTheme}
        className="bg-btn-header-primary/70 hover:bg-btn-header-primary/20 p-2 rounded-md transition-colors duration-300 "
      >
        {theme === "light" ? (
          <span className="text-black">🌙</span>
        ) : (
          <span className="text-white">☀️</span>
        )}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
