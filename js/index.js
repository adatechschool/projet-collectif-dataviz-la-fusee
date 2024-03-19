const btnRandomCharacter = document.getElementById("btn-rnd-char");
const btnRandomEpisode = document.getElementById("btn-rnd-ep")

const randomCharacterId = Math.floor(Math.random() * 826) + 1;
const randomEpisodeId = Math.floor(Math.random() * 51) + 1;

btnRandomCharacter.addEventListener("click", () => {
   location.href = `../characterOne.html?id=${randomCharacterId}`
})

btnRandomEpisode.addEventListener("click", () => {
   location.href = `../episodeOne.html?id=${randomEpisodeId}`
})