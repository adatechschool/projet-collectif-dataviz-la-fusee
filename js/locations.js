async function displayLocations() {
   //Page number
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get("page")) || 1;

    //fetch
    const allLocationsData = await fetch(
        `https://rickandmortyapi.com/api/location/?page=${currentPage}`
    );
    const allLocations = await allLocationsData.json();

    let locationsList = document.getElementById("locations-list");

    //Display locations
    allLocations.results.forEach((location) => {
        //create elements in li
        let h2 = document.createElement("h2");
        h2.append(location.name);
        let type = document.createElement("p");
        type.append(`Type : ${location.type}`);
        let dimension = document.createElement("p");
        dimension.append(`Dimension : ${location.dimension}`);

        //create li and append elements
        let li = document.createElement("li");
        li.append(h2, type, dimension);
        locationsList.append(li);
    });

    //Pagination
    btnPreviousLocations = document.getElementById("btnPreviousLocations");
    btnNextLocations = document.getElementById("btnNextLocations");

   if (currentPage === 1) btnPreviousLocations.disabled = true;
   if (currentPage === allLocations.info.pages) btnNextLocations.disabled = true;

    btnPreviousLocations.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = `./locations.html?page=${currentPage-1}`
    });

    btnNextLocations.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = `./locations.html?page=${currentPage + 1}`;
    });
}

/********************************************************************/
displayLocations();
