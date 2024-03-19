// Welcome
const charContainer = document.querySelector("#charContainer");

async function displayCharacters() {
    try {
        const characterAll = await fetch("https://rickandmortyapi.com/api/character");
        const characterAllJson = await characterAll.json();
        const characterAllResults = await characterAllJson.results;

        characterAllResults.forEach((data) => {

            const newDiv = document.createElement("div");
            const newImg = document.createElement("img");

            newImg.setAttribute("src",)
            newDiv.append
            newDiv.append(data.name);
            charContainer.append(newDiv)

            console.log(data.name)
        })

        console.log(characterAllResults)

    } catch (error) {
        console.error(error)
    }
}
displayCharacters()

