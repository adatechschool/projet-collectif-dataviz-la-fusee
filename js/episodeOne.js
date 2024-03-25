const params = new URLSearchParams(window.location.search);
const episodeId = params.get("id");

async function displayEpisode() {
    try {
        const episodeData = await fetch(
            `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        const episode = await episodeData.json();

        //Episode title
        let episodeTitle = document.querySelector(".episode_title");
        episodeTitle.textContent = episode.name;

        //Episode code
        let episodeCode = document.querySelector(".episode_code");
        const episodeSeason = episode.episode[1] + episode.episode[2];
        const episodeNumber = episode.episode[4] + episode.episode[5];

        episodeCode.textContent = `Season ${parseInt(
            episodeSeason
        )} - Episode ${parseInt(episodeNumber)}`;

        //Episode aired date
        let episodeDate = document.querySelector(".episode_aired");
        episodeDate.textContent += episode.air_date;

        //Episode list of characters
        const idArray = episode.characters.map(
            (charUrl) => charUrl.match(/\d+$/)[0]
        );

        const allCharactersData = await fetch(
            `https://rickandmortyapi.com/api/character/${idArray}`
        );
        const allCharacters = await allCharactersData.json();

        allCharacters.forEach((character) => {
            let charLink = document.createElement("a");
            let charLi = document.createElement("li");
            let charName = document.createElement("p");
            charName.textContent = character.name;
            charLink.href = `/characterOne.html?id=${character.id}`;

            charLi.append(charName);
            charLink.append(charLi);

            document.querySelector(".ep_char_list").append(charLink);
        });
    } catch { }
}

/*********************************************************************************************/

//Button to display list of characters
document.getElementById("btn_collapse-char").addEventListener("click", () => {
    const content = document.querySelector(".ep_char_list");
    content.classList.toggle("hidden_content");
    content.classList.toggle("active_content");
    const icon = document.getElementById("collapse_icon");
    if (icon.textContent === "+") icon.textContent = "-";
    else if (icon.textContent === "-") icon.textContent = "+";
});

displayEpisode();
