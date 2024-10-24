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
}

function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
}

async function getJSON(url, errorMsg = "Something Went Wrong") {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (errorMsg) {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  }
}

const getCountryData = async function (country) {
  try {
    const response = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${country}`,
      `Country Not Found`
    );

    const [data] = response;

    renderCountry(data);
    const [neighbor] = data.borders;

    // const [neighbor] = "JAGUAR";
    if (!neighbor) return;

    const neighborData = await getJSON(
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`,
      `Neighbor Country Not Found`
    );

    renderCountry(neighborData, "neighbor");

    countriesContainer.style.opacity = 1;
  } catch (error) {
    renderError(error.message);
  }
};
getCountryData("usa");

// promise settle all
