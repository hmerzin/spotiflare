const http = require("http");
const { URL } = require("url");
const querystring = require("querystring");
const request = require("request");
const express = require("express");
const app = express();
const clientID = "88d7fd07110f4617a8efd2984e024f4c";
const clientSecret = "392819dcd82840c89b860d41530d10a2";
const path = require("path");
const fs = require("fs");
const save = require("./save");
const getExpiresAt = expiresIn => {
  return new Date().getTime() / 1000 + expiresIn;
};
const basicAuth = new Buffer(clientID + ":" + clientSecret).toString("base64"); 

app.use('/app', express.static('./dist'));
  //req.params.file ? res.sendFile(path.join(__dirname, 'dist', req.params.file)) : res.sendFile(path.join(__dirname, 'dist', 'index.html'));

app.get("/callback*", (req, res) => {
  const url = new URL("http://localhost:8080" + req.url).search;
  const code = querystring.parse(url.substring(1, url.length - 1)).code;
  const options = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    form: {
      code: code,
      redirect_uri: "http://localhost:8080/callback",
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " + basicAuth
    }
  };
  request.post(options, (err, response, body) => {
    body = JSON.parse(body);
    const { expires_in } = body;
    const expires_at = getExpiresAt(expires_in);
    body.expires_at = expires_at;
    const location = `http://localhost:8080/app/#${querystring.stringify(body)}`;
    save("storage.js", body);
    res.redirect(location);
  });
});

app.get("/refresh/:token", (req, res) => {
  console.log('refresh');
  const token = req.params.token;
  const options = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    form: {
      grant_type: "refresh_token",
      refresh_token: token
    },
    headers: {
      Authorization:
        "Basic " + basicAuth
    }
  };
  request.post(options, (err, response, body) => {
    body = JSON.parse(body);
    body.expires_at = getExpiresAt(body.expires_in);
    save("storage.js", body);
    const bodyString = querystring.stringify(body);
    res.redirect(`http://localhost:8080/app/#${bodyString}`);
  });
});

module.exports = app;
