const querystring = require("querystring");

window.addEventListener("load", e => {
  const search = document.querySelector("#search");
  search.addEventListener("keyup", e => {
    console.log(e.target.value);
    window.search(e.target.value);
  });
});

const searchesViews = response => {
  const tableMarkup = `<tr><td class="searchCell">${name}</td><td class="searchCell">Length: ${length} Songs</td></tr><tr><td class="searchCell">Owner: ${author}</td><td class="searchCell">ID: ${id}</td></tr>`;
};
