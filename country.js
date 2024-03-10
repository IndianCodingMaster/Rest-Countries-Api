const country_Name = new URLSearchParams(location.search).get("name");
const countryImg = document.querySelector(".country-image");
const countryName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name");
const region = document.querySelector(".region");
const population = document.querySelector(".population");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const curencies = document.querySelector(".curencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${country_Name}`)
  .then((res) => res.json())
  .then(([country]) => {
    if (countryImg) {
      countryImg.src = country.flags.svg;
    }
    if (countryName) {
      countryName.innerHTML = country.name.common;
    }
    if (nativeName) {
      nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
    }
    if (region) {
      region.innerHTML = country.region;
    }
    if (population) {
      population.innerHTML = country.population.toLocaleString("en-IN");
    }
    if (subRegion) {
      subRegion.innerHTML = country.subregion;
    }
    if (capital) {
      capital.innerHTML = country.capital;
    }
    if (topLevelDomain) {
      topLevelDomain.innerText = country.tld.join(", ");
    }
    if (curencies) {
      curencies.innerHTML = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (languages) {
      languages.innerHTML = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });
