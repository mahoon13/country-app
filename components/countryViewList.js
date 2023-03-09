import { useTheme } from "lib/themeContext";
import CountryViewBox from "./countryViewBox";

export default function CountryViewList({ countries }) {
  const theme = useTheme();

  return (
    <div className="grid justify-items-center gap-y-[2rem] gap-x-[1rem] grid-cols-fluid">
      {countries.map((country, i) => {
        return <CountryViewBox key={i} info={country} />;
      })}
    </div>
  );
}
