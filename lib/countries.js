import axios from "axios";

export async function getAllCountries() {
  const allCountries = await axios
    .get("https://restcountries.com/v2/all")
    .catch((err) => console.log(err));

  return allCountries.data;
}

export async function getCountryByName(name) {
  const country = await axios
    .get(`https://restcountries.com/v2/name/${name}?fullText=true`)
    .catch((err) => console.log(err));

  return country.data;
}

export async function fullCountryNameByCode(code) {
  const country = await axios
    .get(`https://restcountries.com/v2/alpha/${code}`)
    .catch((err) => console.log(err));

  return country.data.name;
}
