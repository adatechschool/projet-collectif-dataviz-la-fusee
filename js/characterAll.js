// Welcome

const charContainer = document.querySelector("#charContainer");
const btnPrevious = document.querySelector("#btnPrevious");
const btnNext = document.querySelector("#btnNext");

async function displayCharacters() {
    try {

        let idPage;

        const params = new URLSearchParams(window.location.search)
        idPage = params.get("page")

        let characterAll = await fetch(`https://rickandmortyapi.com/api/character?page=${idPage}`);
        const characterAllJson = await characterAll.json();
        const characterAllResults = await characterAllJson.results;
        const characterAllInfo = await characterAllJson.info;

        // ==== IDs des pages
        let regex = /[1-9]/
        const URLPageNext = characterAllInfo.next
        let idPageNext = null
        if (URLPageNext) {
            idPageNext = URLPageNext.split("").filter((el) => regex.test(el)).join("")
        }

        const URLPagePrev = characterAllInfo.prev
        let idPagePrev = null;
        if (URLPagePrev) {
            idPagePrev = URLPagePrev.split("").filter((el) => regex.test(el)).join("")
        }
        console.log(idPagePrev)
        console.log(idPageNext)
        console.log(characterAllResults)
        console.log(characterAllInfo)

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

        btnNext.addEventListener("click", (e) => {
            e.preventDefault;
            idPage = idPageNext
            location.href = `./characterAll.html?page=${idPage}`
        })

        btnPrevious.addEventListener("click", (e) => {
            e.preventDefault;
            idPage = idPagePrev
            location.href = `./characterAll.html?page=${idPage}`
        })

    } catch (error) {
        console.error(error)
    }
}
displayCharacters()




