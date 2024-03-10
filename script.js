const cardContainer = document.querySelector(".card-container");

// const cardHTML = `
//     <img src="https://flagcdn.com/in.svg" alt="flag" width="200" />
//     <div class="country-details">
//       <h3>Germany</h3>
//       <p><b>Population : </b><span>8155555</span></p>
//       <p><b>Region : </b><span>Europe</span></p>
//       <p><b>Capital : </b><span>Berlin</span></p>
//     </div>
//   `;
// cardContainer.innerHTML = cardHTML;

// console.log(cardContainer);

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
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
      // console.log(countryCard);
    });
  });
