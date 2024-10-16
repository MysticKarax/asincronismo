import "./style.css";

const countriesContainer = document.querySelector(".countries");
// Our first AJAX call: XMLHttpRequest
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const html = `
    <article class="country">
          <img src="${data.flag}" alt="${
      data.name
    } flag" class="country__img" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>🤼</span>${Number(
              data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>💬</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("mexico");
getCountryData("usa");
getCountryData("german");