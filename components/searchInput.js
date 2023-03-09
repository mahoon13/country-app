import { useTheme } from "lib/themeContext";
import { FaSearch } from "react-icons/fa";
import { isLightTeme } from "utils/helper";

export default function SearchInput({ searchedText, setSearchedText }) {
  const theme = useTheme();

  return (
    <div className="flex relative shadow-thin w-full md:max-w-[450px]">
      <FaSearch
        className={`absolute top-[calc(50%_-_9px)] left-[2rem] ${
          isLightTeme(theme) ? "text-slate-400" : "text-white"
        }`}
        size={18}
      />
      <input
        placeholder="Search for a country..."
        value={searchedText}
        onChange={(ev) => {
          setSearchedText(ev.target.value.trim());
        }}
        className={`w-full px-[4rem] py-[1rem] rounded-lg focus:outline-none ${
          !isLightTeme(theme) ? "bg-dark-500 text-white" : ""
        }`}
      />
    </div>
  );
}
