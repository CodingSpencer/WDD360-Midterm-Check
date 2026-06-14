const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("Search");
const dateInput = document.getElementById("Date");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    // console.log("My search term is:", searchTerm);

    let response = await fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${searchTerm}`);
    let data = await response.json();
    // console.log(data);

    let places = data.results;
    console.log(places);

    if (places.length === 0) {
        console.log("No results found");
        return;
    } else {
        console.log("Results found");
        let html = "";
        for (let place of places) {
            html += `<li><button type="button" onclick="getDetails('${place.id}')">${place.display_name}</button></li>`;
            html += `<div id="${place.id}"></div>`;
        }
        document.getElementById("results").innerHTML = html;
    }
});

async function getDetails(id) {
    console.log("The ID received by getDetails is:", id);
    let response = await fetch(`https://api.inaturalist.org/v1/observations?place_id=${id}`);
    let data = await response.json();
    console.log(data);
    if (data.results && data.results.length > 0) {
        let observation = data.results[0];

    let html = `<h2>${observation.taxon.name}</h2>`;
    if (observation.photos && observation.photos.length > 0) {
        html += `<img src="${observation.photos[0].url}" alt="Observation" width="200" height="200">`;
    } else {
        html += `<p>No photos available</p>`;
    }

    const placeDetails = document.getElementById(id);
    if (placeDetails) {
        placeDetails.innerHTML = html;
    } else {
        console.log("No observation details found for this ID.");
    }

    }
}