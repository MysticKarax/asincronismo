import "./style.css";

const countriesContainer = document.querySelector(".countries");

function renderCountry(data, className = "") {
  const html = `
  <article class="country ${className}">
        <img src="${data.flag}" alt="${data.name} flag" class="country__img" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>🤼</span>${Number(
            data.population / 1000000
          ).toFixed(1)}M people</p>
          <p class="country__row"><span>💬</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

// Deconstruir la propiedad borders

// Our first AJAX call: XMLHttpRequest
const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Country Not Found: ${response.status}`);
      }
      console.log(response);
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      const [data] = responseData;
      console.log(data);
      renderCountry(data);
      const [neighbor] = data.borders;
      if (!neighbor) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
      );
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Country Not Found: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      renderCountry(data, "neighbor");
    });
};
getCountryData("usa");
