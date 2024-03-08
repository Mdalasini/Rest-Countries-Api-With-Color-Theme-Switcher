/**
 * Fetches the country details from the data.json file based on the alpha3Code from the URL query parameter.
 * @function getCountryDetails
 * @async
 */
async function getCountryDetails() {
    try {
      console.log("Getting Country Details")
      // Fetch the data from data.json
      const response = await fetch('data.json');
      const data = await response.json();
  
      // Get the alpha3Code from the URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const alpha3Code = urlParams.get('country');
  
      // Find the country object in the data based on the alpha3Code
      const country = data.find(item => item.alpha3Code === alpha3Code);
  
      if (country) {
        // Extract the country details
        const countryFlag = document.getElementById('country-flag');
        const countryName = document.getElementById('country-name')
        const countryNativeName = document.getElementById('country-native-name');
        const countryPopulation = document.getElementById('country-population');
        const countryRegion = document.getElementById('country-region');
        const countrySubRegion = document.getElementById('country-sub-region');
        const countryCapital = document.getElementById('country-capital');
        const countryDomain = document.getElementById('country-domain');
        const countryCurrencies = document.getElementById('country-currencies');
        const countryLanguages = document.getElementById('country-languages');
        const countryNeighbours = document.getElementById('country-neighbours');
  
        // Set the values of the respective elements
        countryFlag.src = country.flags.svg;
        countryName.textContent = country.name
        countryFlag.alt = `${country.name} flag`
        countryNativeName.textContent = country.nativeName;
        countryPopulation.textContent = country.population;
        countryRegion.textContent = country.region;
        countrySubRegion.textContent = country.subregion;
        countryCapital.textContent = country.capital;
        countryDomain.textContent = country.topLevelDomain[0];
  
        // Format the currencies
        const currenciesString = country.currencies
          .map(currency => `${currency.name} (${currency.symbol})`)
          .join(', ');
        countryCurrencies.textContent = currenciesString;
  
        // Format the languages
        const languagesString = country.languages.map(language => language.name).join(', ');
        countryLanguages.textContent = languagesString;
  
        // Format the neighbours
        countryNeighbours.innerHTML = ''; // Clear the existing content
        for (const neighbourCode of country.borders) {
          const neighbour = data.find(item => item.alpha3Code === neighbourCode);
          if (neighbour) {
            const neighbourElement = document.createElement('li');
            neighbourElement.className = 'border-countries';
            neighbourElement.textContent = neighbour.name;
            neighbourElement.id = neighbour.alpha3Code;
  
            /**
             * @function handleNeighbourClick
             * @param {Event} event - The click event object.
             * @description Handles the click event on a neighbour country element.
             */
            const handleNeighbourClick = function (event) {
              const countryId = this.id.replace(/-/g, ' ');
              const url = `country.html?country=${encodeURIComponent(countryId)}`;
              window.location.href = url;
            };
  
            neighbourElement.addEventListener('click', handleNeighbourClick);
            countryNeighbours.appendChild(neighbourElement);
          }
        }
      } else {
        console.error('Country not found in the data.');
      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
}
  
// Call the getCountryDetails function when the page loads
window.addEventListener('DOMContentLoaded', getCountryDetails);

const backButton = document.getElementById('back-button')

backButton.addEventListener('click', ()=> {
    const url = 'index.html'
    window.location.href = url;
})

