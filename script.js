import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Add an event listener CountryDetails
// It should listen for a clik event 
// When a click happens redirect the user to country.html with country as a query parameter
// the country should be the id of the element
class CountryDetails extends LitElement {
    static styles = css`
        * {
            margin: 0;
            font-size: 16px;
        }

        p {
            margin-left: 1rem/* 16px */;
        }

        ::slotted(h4) {
            font-weight: 800;
            font-size: 18px;
            line-height: 28px;
            margin-bottom: 12px;
            margin-left: 1rem/* 16px */;
        }

        p ::slotted(span) {
            font-weight: 300;
        }
    `;
    
    constructor() {
        super()
        this.addEventListener('click', ()=> {
            const countryId = this.id.replace(/-/g, ' ')
            const url = `country.html?country=${encodeURIComponent(countryId)}`
            window.location.href = url;
        })
    }

    render() {
        return html `
            <slot name="country-flag"></slot>
            <slot name="country-name"></slot>
            <p><slot name="country-name"></slot></p>
            <p>Population: <slot name="country-population"></slot></p>
            <p>Region: <slot name="country-region"></slot></p>
            <p>Capital: <slot name="country-capital"></slot></p>
        `;
    }
}

customElements.define('country-details', CountryDetails)

fetch('/data.json')
    .then(Response => Response.json())
    .then(data => {
        console.log(data[0])
    })

/**
* Fetches data from a JSON file and processes each item.
* @async
* @function fetchAndProcessData
* @param {string} url - The URL of the JSON file.
* @returns {Promise<void>} A Promise that resolves when the data is processed.
*/
async function fetchAndProcessData(url) {
    try {
      // TODO 1: Get data from /data.json
      const response = await fetch(url);
      const data = await response.json();
   
      // Loop through the data
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
   
        // TODO 2: For each item in the list, get the following values based on the key
        const name = item.name;
        const population = item.population;
        const region = item.region;
        const capital = item.capital;
        const alpha3Code = item.alpha3Code
        const flag = item.flags.svg
   
        // TODO 3: At the end of each loop, parse all these values to a new function called renderCountry
        renderCountry(name, population, region, capital, alpha3Code, flag);
      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
}
   
/**
/**
* Renders a country's information.
* @function renderCountry
* @param {string} name - The name of the country.
* @param {number} population - The population of the country.
* @param {string} region - The region where the country is located.
* @param {string} capital - The capital city of the country.
* @param {alpha3Code} string - A unique code used to identify the country.
* @param {string} flag - The link to the flag of the country.
*/
function renderCountry(name, population, region, capital, alpha3Code, flag) {
    // TODO 4: Create the HTML element "country-details" with the id as alpha3Code
    const countryDetails = document.createElement('country-details');
    countryDetails.id = alpha3Code;
   
    // TODO 5: Append the following children
    // An image tag with the source being the flag string and slot="country-flag"
    const flagImage = document.createElement('img');
    flagImage.src = flag;
    flagImage.slot = 'country-flag';
    countryDetails.appendChild(flagImage);
   
    // A h4 tag with the text as the name and slot="country-name"
    const countryName = document.createElement('h4');
    countryName.textContent = name;
    countryName.slot = 'country-name';
    countryDetails.appendChild(countryName);
   
    // A span tag with the text as the population and slot="country-population"
    // Ensure that for the population it's readable, i.e., instead of 1000000 it's 1,000,000
    const formattedPopulation = population.toLocaleString();
    const countryPopulation = document.createElement('span');
    countryPopulation.textContent = formattedPopulation;
    countryPopulation.slot = 'country-population';
    countryDetails.appendChild(countryPopulation);
   
    // A span tag with the text as the region and slot="country-region"
    const countryRegion = document.createElement('span');
    countryRegion.textContent = region;
    countryRegion.slot = 'country-region';
    countryDetails.appendChild(countryRegion);
   
    // A span tag with the text as the capital and slot="country-capital"
    const countryCapital = document.createElement('span');
    countryCapital.textContent = capital;
    countryCapital.slot = 'country-capital';
    countryDetails.appendChild(countryCapital);
   
    // Append the country-details element to the countries div
    const countriesContainer = document.getElementById('countries-container')
    countriesContainer.appendChild(countryDetails);
   }
   
// Call the fetchAndProcessData function with the URL of the JSON file
fetchAndProcessData('/data.json');



   