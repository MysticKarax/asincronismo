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
  // countriesContainer.style.opacity = 1;
}

function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
}

// Deconstruir la propiedad borders

function getJSON(url, errorMsg = "Something Went Wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
}

const getCountryData = function (country) {
  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    `Country Not Found`
  )
    .then((responseData) => {
      const [data] = responseData;

      renderCountry(data);
      const [neighbor] = data.borders;
      // const [neighbor] = "JAGUAR";
      if (!neighbor) return;

      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`,
        `Neighbor Country Not Found`
      );
    })
    .then((data) => {
      renderCountry(data, "neighbor");
    })
    .catch((error) => {
      renderError(error.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
getCountryData("usa");

// Convertir todo a async/await
// promise settle all
