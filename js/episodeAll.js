const navSeasonContainer = document.querySelector(".seasonsTable");
const navEpisodeContainer = document.querySelector(".episodesTableBody");

const getSeason = function (episode) {
  const season = episode.split("E")[0];
  const seasonNum = Number(season.slice(1));
  //   console.log(seasonNum);
  return seasonNum;
};
// getSeason("S01E05");
const divideEpiSeason = function (data) {};

const allEpisodes = async function () {
  try {
    let allEpisodesArray = [];
    let episodesPerSeason = [];
    let htmlTableSeasons = "";
    let htmlTableEpisodes = "";
    let currentSeason = 0;

    const url = `https://rickandmortyapi.com/api/episode`;
    const allEpisodesFetch = await fetch(url);
    const allEpisodesData = await allEpisodesFetch.json();
    // console.log(allEpisodesData.info.pages);
    // console.log(allEpisodesData);
    for (let i = allEpisodesData.info.pages; i > 0; i--) {
      const url = `https://rickandmortyapi.com/api/episode?page=${i}`;
      const allEpisodesFetch = await fetch(url);
      const allEpisodesData = await allEpisodesFetch.json();
      allEpisodesArray.unshift(allEpisodesData.results);
      //   console.log(allEpisodesData);
    }

    allEpisodesArray = allEpisodesArray.flat();
    allEpisodesArray.forEach((episode) => {
      const season = getSeason(episode.episode);
      if (episodesPerSeason[season - 1]) {
        episodesPerSeason[season - 1].push(episode);
      } else {
        episodesPerSeason[season - 1] = [episode];
      }
    });

    console.log(allEpisodesArray);
    console.log(episodesPerSeason);
    divideEpiSeason(allEpisodesData);
    episodesPerSeason.forEach((_, i) => {
      htmlTableSeasons += `
        <tr>
            <td>${i + 1}</td>
        </tr>
        `;
    });
    allEpisodesArray.forEach((episode, i) => {
      if (getSeason(episode.episode) === currentSeason) {
        htmlTableEpisodes += `
    <tr>
        <td># ${i + 1}</td>
        <td>${episode.name}</td>
    </tr>
        `;
      } else {
        htmlTableEpisodes += `
        <tr>
            <td>Season ${getSeason(episode.episode)}</td>
        </tr>
            `;
        currentSeason = getSeason(episode.episode);
      }
    });

    navSeasonContainer.insertAdjacentHTML("beforeend", htmlTableSeasons);
    navEpisodeContainer.insertAdjacentHTML("beforeend", htmlTableEpisodes);
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
