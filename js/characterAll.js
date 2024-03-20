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

            newImg.setAttribute("src", `https://rickandmortyapi.com/api/character/avatar/${data.id}.jpeg`);
            newImg.setAttribute("id", "test");

            newDiv.append(newImg);
            newDiv.append(data.name);
            charContainer.append(newDiv)

            newImg.addEventListener("click", () => {
                location.href = `./characterOne.html?id=${data.id}`
            })

        })

        console.log(characterAllResults)

    } catch (error) {
        console.error(error)
    }
}
displayCharacters()
