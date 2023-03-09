import { useState, useEffect } from "react";
import { getAllCountries } from "lib/countries";
import Layout from "./layout";
import FilterSelect from "components/filterSelect";
import CountryViewList from "components/countryViewList";
import SearchInput from "components/searchInput";
import { BiSad } from "react-icons/bi";

export default function Home({ allCountries }) {
  const [searchedText, setSearchedText] = useState("");
  const [filteredRegion, setFilteredRegion] = useState("All");

  if (searchedText !== "") {
    allCountries = allCountries.filter(
      (country) => country.name.toLowerCase().indexOf(searchedText) !== -1
    );
  }
  if (filteredRegion !== "All") {
    allCountries = allCountries.filter((country) => {
      return country.region === filteredRegion;
    });
  }

  if (allCountries) {
    return (
      <Layout>
        <div className="p-[2rem]">
          <div className="flex flex-col gap-[2rem] mb-[2rem] md:flex-row md:justify-between">
            <SearchInput
              searchedText={searchedText}
              setSearchedText={setSearchedText}
            />

            <FilterSelect
              filteredRegion={filteredRegion}
              setFilteredRegion={setFilteredRegion}
            />
          </div>

          <CountryViewList countries={allCountries} />
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-[.5rem] text-3xl justify-center h-screen w-fit m-auto text-red-600 font-bold">
        <BiSad size={100} />
        Failed to fetch data
      </div>
    );
  }
}

export async function getStaticProps() {
  const allCountries = await getAllCountries();

  if (allCountries !== null) {
    return {
      props: {
        allCountries: allCountries.map((country) => {
          return {
            flag: (country.flags && country.flags.svg) || null,
            name: country.name || null,
            population: country.population || null,
            region: country.region || null,
            capital: country.capital || null,
          };
        }),
      },
    };
  } else {
    return { props: {} };
  }
}
