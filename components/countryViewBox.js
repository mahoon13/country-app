import { useTheme } from "lib/themeContext";
import Image from "next/image";
import Link from "next/link";
import { formatPopultaion, isLightTeme } from "utils/helper";

export default function CountryViewBox({
  info: { flag, name, population, region, capital },
}) {
  const theme = useTheme();

  return (
    <div
      className={`w-[250px] rounded-md overflow-hidden cursor-pointer hover:scale-2 shadow-thiner hover:scale-105 transition-transform ${
        isLightTeme(theme) ? "bg-white" : "bg-dark-500 text-white"
      }`}
    >
      <Link href={`/country/${name}`}>
        <div className="relative w-full h-[150px]">
          <Image
            src={flag}
            alt={`${name} flag`}
            fill
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <div className="flex flex-col gap-[.5rem] p-[1rem]">
          <div className="text-lg font-bold">{name}</div>

          <div>
            <p>Population: {formatPopultaion(population)}</p>
            <p>Region: {region}</p>
            <p>Capital: {String(capital)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
