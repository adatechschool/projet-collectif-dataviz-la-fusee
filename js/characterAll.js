// Welcome

const charContainer = document.querySelector("#charContainer");
const btnPrevious = document.querySelector("#btnPrevious");
const btnNext = document.querySelector("#btnNext");
const subNavBar = document.querySelector("#subNavBar");
const inputGoToPage = document.querySelector("#inputGoToPage");
inputGoToPage.setAttribute("autocomplete", "off");

function displaySelectOptions() {
    //Add all options to species select
   const speciesSelect = document.getElementById("species");
   const allSpecies = [
      "Human",
      "Alien",
      "Humanoid",
      "unknown",
      "Poopybutthole",
      "Mythological Creature",
      "Animal",
      "Robot",
      "Cronenberg",
      "Disease",
   ];
   allSpecies.forEach((species, key) => {
      speciesSelect[key + 1] = new Option(species, species);
   });

   //Select current filters
   const query = window.location.search;
   console.log(query);
}

function getFilterParams() {
    const allFiltersOptions = ["gender", "status", "species"]
    const allSelectedFilters = allFiltersOptions.filter((option) => document.getElementById(option).value != "");
    const allFiltersUrl = allSelectedFilters.map((filterOption) => {
        let optionValue = document.getElementById(filterOption).value;
        let url = `${filterOption}=${optionValue}`;
        return url;
    });
    return allFiltersUrl.join("&");
}

async function displayCharacters() {
   try {
      const params = new URLSearchParams(window.location.search);
      let idPage = params.get("page") || 1;
      let genderFilter = params.get("gender")
         ? `&gender=${params.get("gender")}`
         : "";
      let statusFilter = params.get("status")
         ? `&status=${params.get("status")}`
         : "";
      let speciesFilter = params.get("species")
         ? `&status=${params.get("status")}`
         : "";

      // ==== Limitation de la page max
      if (parseInt(idPage) > 42) idPage = "42";

      let characterAll = await fetch(
         `https://rickandmortyapi.com/api/character${window.location.search}`
      );
      const characterAllJson = await characterAll.json();
      const characterAllResults = await characterAllJson.results;
      const characterAllInfo = await characterAllJson.info;

      // ==== URLs des pages Next et Prev
      const URLPageNext = characterAllInfo.next;
      const URLPagePrev = characterAllInfo.prev;
      // == Fin URLs

      // ==== Creation dynamique de la page
      characterAllResults.forEach((data) => {
         const newDiv = document.createElement("div");
         const newDiv2 = document.createElement("div");
         const newImg = document.createElement("img");

         newImg.setAttribute(
            "src",
            `https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`
         );

         newDiv.append(newImg);
         charContainer.append(newDiv);
         newDiv2.append(data.name);
         charContainer.append(newDiv2);

         newImg.addEventListener("click", () => {
            location.href = `./characterOne.html?id=${data.id}`;
         });
      });
      // == Fin page dynamique

      // ==== Gestion des pages Next/Prev et Go-To-Page
      {
         // = Next
         btnNext.addEventListener("click", (e) => {
            e.preventDefault();

            if (URLPageNext) {
               let params = new URL(URLPageNext).searchParams;
               idPage = params.get("page");
            } else idPage = "1";

            location.href = `./characterAll.html?page=${idPage}${genderFilter}${statusFilter}${speciesFilter}`;
         });

         // = Prev
         btnPrevious.addEventListener("click", (e) => {
            e.preventDefault();

            if (URLPagePrev) {
               let params = new URL(URLPagePrev).searchParams;
               idPage = params.get("page");
            } else idPage = "42";

            location.href = `./characterAll.html?page=${idPage}${genderFilter}${statusFilter}${speciesFilter}`;
         });

         inputGoToPage.value = idPage;
         inputGoToPage.addEventListener("change", (e) => {
            e.preventDefault();

            idPage = inputGoToPage.value;
            location.href = `./characterAll.html?page=${idPage}`;
         });
      } // == Fin gestion pages Next/Prev et Go-To-Page
   } catch (error) {
      console.error(error);
   }
}

/**************************************************************/
displaySelectOptions();
displayCharacters();

const filterBtn = document.getElementById("filter-btn");
filterBtn.addEventListener("click", () => {
   const urlParams = getFilterParams();
   location.href = `/characterAll.html?${urlParams}`
});
