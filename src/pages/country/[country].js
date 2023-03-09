import {
  getAllCountries,
  getCountryByName,
  fullCountryNameByCode,
} from "lib/countries";
import { formatPopultaion, isLightTeme } from "utils/helper";
import { FaArrowLeft } from "react-icons/fa";

import Image from "next/image";
import Layout from "../layout";
import Link from "next/link";
import { useTheme } from "../../../lib/themeContext";

export default function CountryPage({ info }) {
  const theme = useTheme();

  return (
    <Layout>
      <div className="w-fit p-[2rem] m-auto">
        <Link href="/">
          <div
            className={`flex items-center gap-[.5rem] mb-[3rem] rounded-md shadow-thiner w-fit py-[.5rem] pl-[1rem] pr-[1.5rem] ${
              !isLightTeme(theme) ? "bg-dark-500 text-white" : ""
            }`}
          >
            <FaArrowLeft size={15} />
            Back
          </div>
        </Link>

        <div
          className={`flex flex-col gap-[3rem] lg:flex-row ${
            !isLightTeme(theme) ? "text-white" : ""
          }`}
        >
          <div className="flex-none relative w-[300px] h-[200px] md:w-[400px] md:h-[250px] lg:w-[450px] lg:h-[275px]">
            <Image src={info.flags.png} alt={`${info.name} flag`} fill />
          </div>

          <div className="flex flex-col gap-[1rem] lg:mt-[1rem]">
            <div className="text-2xl font-bold">{info.name}</div>

            <div className="flex flex-col gap-[2rem] lg:flex-row lg:gap-[4rem]">
              <div>
                <p>Native Name: {info.nativeName}</p>
                <p>Population: {formatPopultaion(info.population)}</p>
                <p>Region: {info.region}</p>
                <p>Sub Region: {info.subregion}</p>
                <p>Capital: {String(info.capital)}</p>
              </div>

              <div>
                <p>Top Level Domain: {String(info.topLevelDomain)}</p>
                <p>
                  Currencies:{" "}
                  {String(info.currencies.map((currency) => currency.name))}
                </p>
                <p>
                  Languages:{" "}
                  {String(info.languages.map((language) => language.name))}
                </p>
              </div>
            </div>

            {info.borders && (
              <div className="flex flex-col max-w-[300px] md:max-w-[400px] lg:max-w-none mt-[2rem] gap-[.5rem] lg:flex-row lg:gap-[1rem]">
                <p className="font-bold flex-none mt-[.5rem]">
                  Border Countries:
                </p>
                <div className="flex flex-wrap gap-x-[1rem] gap-y-[.5rem]">
                  {info.borders.map((border) => {
                    return (
                      <Link
                        key={border}
                        className={`px-[1.5rem] py-[.5rem] w-fit shadow-thiner rounded-md cursor-pointer hover:scale-105 transition-transform ${
                          isLightTeme(theme) ? "bg-white" : "bg-dark-500"
                        }`}
                        href={`/country/${border}`}
                      >
                        {border}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { country } }) {
  const search = await getCountryByName(country);
  const data = search[0];

  if (data.borders) {
    await Promise.all(
      data.borders.map(async (border, i) => {
        const fullName = await fullCountryNameByCode(border);
        data.borders[i] = fullName;
      })
    );
  }

  return {
    props: {
      info: data,
    },
  };
}

export async function getStaticPaths() {
  const allCountries = await getAllCountries();
  const allNames = allCountries.map((country) => {
    return "/country/" + (country.name || null);
  });
  return {
    paths: allNames,
    fallback: "blocking",
  };
}
