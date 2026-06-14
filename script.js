const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("Search");
const dateInput = document.getElementById("Date");

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    // console.log("My search term is:", searchTerm);

    const url = `https://api.inaturalist.org/v1/places/autocomplete?q=${searchTerm}`;

    let response = await fetch(url);
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
        }
        document.getElementById("results").innerHTML = html;
    }
});

async function getDetails(id) {

}