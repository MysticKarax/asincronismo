import "../style.css";

import { getJSON } from "./lib/utils.js";
import { btnCountry, countriesContainer, renderCountry } from "./view.js";

// const countriesContainer = document.querySelector(".countries");
// const btnCountry = document.querySelector(".btn-country");

// function renderCountry(data, className = "") {
//   const html = `
//   <article class="country ${className}">
//         <img src="${data.flag}" alt="${data.name} flag" class="country__img" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>🤼</span>${Number(
//             data.population / 1000000
//           ).toFixed(1)}M people</p>
//           <p class="country__row"><span>💬</span>${data.languages[0].name}</p>
//           <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//   </article>
//   `;
//   countriesContainer.insertAdjacentHTML("beforeend", html);
// }

function renderError(message) {
  countriesContainer.insertAdjacentText("beforeend", message);
}

// async function getJSON(url, errorMsg = "Something Went Wrong") {
//   try {
//     const response = await fetch(url);
//     return response.json();
//   } catch (errorMsg) {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
//   }
// }

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
    if (neighbor) {
      const neighborData = await getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`,
        `Neighbor Country Not Found`
      );

      renderCountry(neighborData, "neighbor");
    }
    countriesContainer.style.opacity = 1;
  } catch (error) {
    renderError(error.message);
  }
};

// Evento de click que llama a la función gacha
btnCountry.addEventListener("click", () => {
  getCountryData("spain");

  // Llamamos a gacha como función y manejamos la promesa
  gacha()
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});

let countTiradasUsuario = 0;

const gacha = () => {
  return new Promise((resolve, reject) => {
    console.log("Se ejecuta la animacion de la tirada");

    const tiradasMax = 16;
    const winMessage = "Ganaste la waifu! 👯‍♀️";
    const loseMessage = "Sigue intentando! 🙏";
    let pity = false;

    setTimeout(() => {
      countTiradasUsuario++;
      console.log(`Tirada número: ${countTiradasUsuario}`);

      // Definimos las probabilidades dentro del setTimeout para que cambien con cada tirada
      const probabilidadNormal = Math.random() >= 0.95;
      const probabilidad50 = Math.random() >= 0.5;

      // 1. Condición de tirada normal
      if (countTiradasUsuario < 8) {
        if (probabilidadNormal) {
          console.log("Ganaste con probabilidad normal");
          resolve(winMessage);
        } else {
          console.log("Perdiste con probabilidad normal");
          reject(loseMessage);
        }

        // 2. Condición de probabilidad aumentada al 50%
      } else if (countTiradasUsuario === tiradasMax / 2 && !pity) {
        pity = true;
        if (probabilidad50) {
          console.log("Ganaste el 50/50!");
          resolve(winMessage);
        } else {
          console.log("Perdiste el 50/50");
          reject(loseMessage);
        }

        // 3. Condición de tirada asegurada
      } else if (countTiradasUsuario >= tiradasMax) {
        console.log("Hard Pity Ganado");
        resolve(winMessage);
      }
    }, 2000);
  });
};

async function get3Countries(c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data.map((data) => data[0].capital));
  } catch (error) {
    console.log(error);
  }
}

// get3Countries("Mexico", "Canada", "Spain");

(async function () {
  const rest = await Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Mexico`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Chile`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Argentina`),
  ]);
  console.log(rest[0]);
  Promise.allSettled([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Mexico`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Chile`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Argentina`),
  ]).then((response) => console.log(response));
  Promise.any([
    getJSON(`https://countries-api-836d.onrender/countries/name/Mexico`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Chile`),
    getJSON(`https://countries-api-836d.onrender.com/countries/name/Argentina`),
  ]).then((response) => console.log(response));
})();
