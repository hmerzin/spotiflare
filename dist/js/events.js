const querystring = require("querystring");

window.addEventListener("load", e => {
  const search = document.querySelector("#search");
  const resultContainer = document.querySelector('#searchResult');
  search.addEventListener("keyup", e => {
    let markupArray = [];
    window.search(e.target.value, response => {
      response.playlists.items.forEach((playlist, index) => {
        const resultMarkup = index < 6 ? searchesViews(playlist) : null;    //index < 6 ? console.log(searchesViews(playlist)) : console.log('not displayed');
        markupArray.push(resultMarkup);
        resultContainer.innerHTML = markupArray;
        //resultContainer.firstChild ? resultContainer.insertBefore(resultMarkup, resultContainer.firstChild) : resultContainer.appendChild(resultmarkup);
      });
      console.log(markupArray);
    });
  });
});

const searchesViews = item => {
  const { name } = item,
    { total } = item.tracks,
    { id } = item,
    { url } = item.images[0],
    { owner } = item;
  const tableMarkup =   `<div class="searchResult"><img src=${url} class="playlistImage"/><table class="searchTable"><tr class="searchRow"><td class="searchCell">${name}</td><td class="searchCell">Length: ${total} Songs</td></tr><tr class="seperator" /><tr class="searchRow"><td class="searchCell">Owner: ${owner}</td><td class="searchCell">ID: ${id}</td></tr></table>`;
  return tableMarkup;
};
