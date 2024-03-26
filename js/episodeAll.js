const navSeasonContainer = document.querySelector(".seasonsTable");
const navEpisodeContainer = document.querySelector(".episodesTableBody");

const getSeason = function (episode) {
  const season = episode.split("E")[0];
  const seasonNum = Number(season.slice(1));
  //   console.log(seasonNum);
  return seasonNum;
};
// getSeason("S01E05");

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   e.preventDefault();

//   // Matching strategy
//   if (e.target.classList.contains("nav__link")) {
//     // console.log(e.target.getAttribute("href"));
//     const id = e.target.getAttribute("href");
//     // console.log(document.querySelector(id));
//     document.querySelector(id).scrollIntoView({ behaviour: "smooth" });
//   }
// });

const allEpisodes = async function () {
  try {
    let allEpisodesArray = [];
    let episodesPerSeason = [];
    let htmlSeasonLinks = "";
    let htmlSeasonContents = "";

    const url = `https://rickandmortyapi.com/api/episode`;
    const allEpisodesFetch = await fetch(url);
    const allEpisodesData = await allEpisodesFetch.json();
    // console.log(allEpisodesData.info.pages);
    // console.log(allEpisodesData);
    for (let i = allEpisodesData.info.pages; i > 0; i--) {
      const pageUrl = `https://rickandmortyapi.com/api/episode?page=${i}`;
      const pageFetch = await fetch(pageUrl);
      const pageData = await pageFetch.json();
      allEpisodesArray.unshift(...pageData.results);
      //   console.log(allEpisodesData);
    }

    // allEpisodesArray = allEpisodesArray.flat();
    allEpisodesArray.forEach((episode) => {
      const seasonNumber = getSeason(episode.episode);
      if (!episodesPerSeason[seasonNumber - 1])
        episodesPerSeason[seasonNumber - 1] = [];
      episodesPerSeason[seasonNumber - 1].push(episode);
    });

    console.log(allEpisodesArray);
    console.log(episodesPerSeason);
    // divideEpiSeason(allEpisodesData);

    episodesPerSeason.forEach((episodes, i) => {
      if (!episodes) return;

      htmlSeasonLinks += `<a class="nav__item nav__link" href="#season-${
        i + 1
      }">Season ${i + 1}</a>`;

      let seasonEpisodesHtml = episodes
        .map(
          (episode) =>
            `<div class="episodeUniAll">
          <div class="episode-number">#${episode.episode}</div>
          <div class="episode-name">${episode.name}</div>
         </div>`
        )
        .join("");

      htmlSeasonContents += `
        <div class="season-container" id="season-${i + 1}" data-season="${
        i + 1
      }" style="background-image: url('images/season${i}.png');  ">
          <h2 class="season">Season ${i + 1}</h2>
          <div class="episodes-container">
            ${seasonEpisodesHtml}
          </div>
        </div>
      `;
    });

    // episodes.addEventListener("click", (e) => {
    //   console.log(e);
    // });
    navSeasonContainer.innerHTML = htmlSeasonLinks;
    navEpisodeContainer.innerHTML = htmlSeasonContents;
    const episode = document.querySelectorAll(".episodeUniAll");
    console.log(episode);
    // console.log(episode);
    episode.forEach((ep, i) => {
      ep.addEventListener("click", () => {
        location.href = `./episodeOne.html?id=${i + 1}`;
        console.log(this);
      });
    });
  } catch (error) {
    console.error("Found an error", error);
  }
};
allEpisodes();
// let episodes = [];
// let season = 1;
// let tryAdd = ["hello"];
// let tryAdd1 = ["helloss"];
// console.log(episodes);
// episodes[season].unshift(tryAdd);
// // episodes[season] tryAdd
// console.log(episodes);
