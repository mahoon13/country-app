import { useTheme, useThemeUpdate } from "lib/themeContext";
import { FaRegMoon, FaMoon } from "react-icons/fa";
import { isLightTeme } from "utils/helper";
import Link from "next/link";

export default function Navbar() {
  const toggleTheme = useThemeUpdate();
  const theme = useTheme();

  return (
    <div
      className={`flex justify-between items-center justify-items-center p-[1.5rem] md:px-[3rem] lg:px-[4rem] border-b-[1px] shadow-lg fixed z-50 w-full ${
        isLightTeme(theme) ? "bg-light" : "bg-dark-500 border-dark-500"
      }`}
    >
      <Link
        className={`font-bold text-lg md:text-xl lg:text-2xl ${
          !isLightTeme(theme) ? "text-white" : ""
        }`}
        href="/"
      >
        Where in the world?
      </Link>

      <div
        className={`cursor-pointer flex gap-[.5rem] items-center ${
          !isLightTeme(theme) ? "text-white" : ""
        }`}
        onClick={toggleTheme}
      >
        {isLightTeme(theme) ? <FaRegMoon /> : <FaMoon />}
        Dark Mode
      </div>
    </div>
  );
}
