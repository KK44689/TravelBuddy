const searchButton = document.getElementById("searchBtn");
const clearButton = document.getElementById("resetSearchBtn");
const cardContainer = document.getElementById("rec-card-container");

function SearchRecommendation() {
    const input = document.getElementById("recommendationInput").value.toLowerCase();

    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            let results = [];

            data.countries.forEach(country => {
                if (country.name.toLowerCase().includes(input)) {
                    country.cities.forEach(city => {
                        results.push(city);
                    });
                }

                const searchByCities = country.cities.filter(city => city.name.toLowerCase().includes(input));
                console.log(`searchByCities: ${searchByCities}`);
                if (searchByCities) results.push(...searchByCities);

                const searchByCityDescription = country.cities.filter(city => city.description.toLowerCase().includes(input));
                if (searchByCityDescription) results.push(...searchByCityDescription);
            });

            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(input) || temple.description.toLowerCase().includes(input)) {
                    results.push(temple);
                }
            });

            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(input) || beach.description.toLowerCase().includes(input)) {
                    results.push(beach);
                }
            });

            const result = Array.from(
                new Map(results.map(item => [item.name, item])).values()
            );

            const filteredResult = result.filter(r => r.length != 0);
            cardContainer.innerHTML = "";
            filteredResult.forEach(result => {
                cardContainer.innerHTML += `<div class="rec-card">
          <img
            src="${result.imageUrl}"
            width="100%"
          />
          <div class="text-card">
            <h1 class="card-title">${result.name}</h1>
            <p class="card-description">${result.description}</p>
            <button class="card-button">Visit</button>
          </div>
        </div>`
            })
        }
        )
        .catch(error => {
            console.error('Error:', error);
        })
}

function clearSearchResult() {
    cardContainer.innerHTML = "";
}

// Add button event handler
searchButton.addEventListener('click', SearchRecommendation);
clearButton.addEventListener('click', clearSearchResult)