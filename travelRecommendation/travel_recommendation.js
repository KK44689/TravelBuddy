const searchButton = document.getElementById("searchBtn");


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

            console.log(result.filter(r => r.length != 0));
        })
        .catch(error => {
            console.error('Error:', error);
        })
}

// Add button event handler
searchButton.addEventListener('click', SearchRecommendation);