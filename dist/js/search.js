console.log("request");
window.search = (term, after) => {
  const request = new Request(
    `https://api.spotify.com/v1/search?q="${term}"&type=playlist`,
    {
      headers: new Headers({
        Authorization: "Bearer " + window.token
      })
    }
  );
  fetch(request).then(response => {
    return response.json();
  }).then(json => {
    console.log(json)
    after(json);
  });
};
