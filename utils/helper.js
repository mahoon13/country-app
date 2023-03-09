import { THEMES } from "lib/themeContext";
import { getAllCountries } from "lib/countries";
import axios from "axios";

export function formatPopultaion(population) {
  population = String(population);
  return population
    .split("")
    .map((letter, i) =>
      (population.length - (i + 1)) % 3 === 0 && i + 1 !== population.length
        ? letter + ","
        : letter
    )
    .join("");
}

export function isLightTeme(theme) {
  return theme === THEMES.LIGHT;
}
