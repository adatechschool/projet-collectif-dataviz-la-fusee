const btnRandomCharacter = document.getElementById("btn-rnd-char");
const btnRandomEpisode = document.getElementById("btn-rnd-ep")

const randomId = Math.floor(Math.random() * 826) + 1;

btnRandomCharacter.addEventListener("click", () => {
   location.href = `../characterOne.html?id=${randomId}`
})