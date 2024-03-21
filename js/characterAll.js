// Welcome

const charContainer = document.querySelector("#charContainer");
const btnPrevious = document.querySelector("#btnPrevious");
const btnNext = document.querySelector("#btnNext");

async function displayCharacters() {
    try {

        const params = new URLSearchParams(window.location.search)
        let idPage = params.get("page")

        let characterAll = await fetch(`https://rickandmortyapi.com/api/character?page=${idPage}`);
        const characterAllJson = await characterAll.json();
        const characterAllResults = await characterAllJson.results;
        const characterAllInfo = await characterAllJson.info;

        // ==== URLs des pages Next et Prev
        const URLPageNext = characterAllInfo.next
        const URLPagePrev = characterAllInfo.prev
        // == Fin URLs

        // ==== Creation dynamique de la page
        characterAllResults.forEach((data) => {

            const newDiv = document.createElement("div");
            const newImg = document.createElement("img");

            newImg.setAttribute("src", `https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`);

            newDiv.append(newImg);
            newDiv.append(data.name);
            charContainer.append(newDiv)

            newImg.addEventListener("click", () => {
                location.href = `./characterOne.html?id=${data.id}`
            })

        })
        // == Fin page dynamique

        // ==== Gestion des pages Next et Prev sur event sur bouttons
        // = Next
        btnNext.addEventListener("click", (e) => {
            e.preventDefault;

            if (URLPageNext) {
                let params = new URL(URLPageNext).searchParams;
                idPage = params.get("page");
            } else idPage = "1"

            location.href = `./characterAll.html?page=${idPage}`
        })

        // = Prev
        btnPrevious.addEventListener("click", (e) => {
            e.preventDefault;

            if (URLPagePrev) {
                let params = new URL(URLPagePrev).searchParams;
                idPage = params.get("page");
            } else idPage = "42"

            location.href = `./characterAll.html?page=${idPage}`
        })
        // == Fin gestion pages Next & Prev

    } catch (error) {
        console.error(error)
    }
}
displayCharacters()




