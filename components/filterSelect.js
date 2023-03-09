import { FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { isLightTeme } from "utils/helper";
import { useTheme } from "lib/themeContext";

const Menu = ({ filteredRegion, setFilteredRegion, theme, menuRef }) => {
  return (
    <div
      className={`absolute z-50 flex flex-col gap-[1rem] top-[120%] left-0 w-full rounded-lg shadow-lg p-[1rem] ${
        isLightTeme(theme) ? "bg-white" : "bg-dark-500 text-white"
      }`}
      ref={menuRef}
    >
      {["All", "Africa", "Americas", "Asia", "Europe", "Oceania"].map(
        (region, i) => {
          return (
            <div
              key={i}
              className={`cursor-pointer w-fit ${
                region === filteredRegion ? "text-blue-500 font-bold" : ""
              }`}
              onClick={() => setFilteredRegion(region)}
            >
              {region}
            </div>
          );
        }
      )}
    </div>
  );
};

export default function FilterSelect({ filteredRegion, setFilteredRegion }) {
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();

  const menuRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    document.addEventListener("click", (ev) => {
      //close the menu if user clicks outside the menu or menu button
      if (openMenu) {
        if (
          ev.target !== menuRef.current &&
          ev.target.parentElement !== menuRef.current &&
          ev.target !== buttonRef.current &&
          ev.target.parentElement !== buttonRef.current &&
          ev.target.parentElement.parentElement.parentElement !==
            buttonRef.current
        ) {
          setOpenMenu(false);
        }
      }
    });
  }, [openMenu]);

  return (
    <div className="relative w-fit min-w-[260px] shadow-thin">
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className={`px-[1.5rem] py-[1rem] rounded-lg  flex items-center justify-between cursor-pointer ${
          isLightTeme(theme) ? "bg-white" : "bg-dark-500 text-white"
        }`}
        ref={buttonRef}
      >
        Filter by Region
        <div className="flex items-center gap-[.5rem]">
          {filteredRegion}
          <FaChevronDown
            className={`mt-[2px] transition-transform ease-linear duration-300 ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {openMenu && (
        <Menu
          filteredRegion={filteredRegion}
          setFilteredRegion={setFilteredRegion}
          theme={theme}
          menuRef={menuRef}
        />
      )}
    </div>
  );
}
