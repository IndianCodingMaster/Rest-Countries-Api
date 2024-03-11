const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("#input");
const filterByRegion = document.querySelector(".filter-by-region");
const themeChanger = document.querySelector(".theme-changer");

let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
    });
});

function renderCountries(data) {
  cardContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.classList.add("card");
    countryCard.innerHTML = `
      <img src=${country.flags.svg} alt="flag" />
      <div class="country-details">
        <h3>${country.name.common}</h3>
        <p><b>Population : </b><span>${country.population.toLocaleString(
          "en-IN"
        )}</span></p>
        <p><b>Region : </b><span>${country.region}</span></p>
        <p><b>Capital : </b><span>${country.capital}</span></p>
      </div>
     `;
    cardContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
