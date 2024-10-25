export const countriesContainer = document.querySelector(".countries");
export const btnCountry = document.querySelector(".btn-country");

export function renderCountry(data, className = "") {
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
