const express = require("express");
const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const lyricsFinder = require('lyrics-finder')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/spotifyRefresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/createprofile",
    clientId: "9b3a36201ec44b3997b96cda5eb09785",
    clientSecret: "4764fb6f7d654dcab3fc3c041af6640b",
    refreshToken,
  });
  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
      res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expiresIn
      })
    })
    .catch((err) => {
      res.sendStatus(400);
      console.log("Could not refresh access token", err);
    });
});

app.post("/spotifyLogin", (req, res) => {
  console.log("hi");
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/createprofile",
    clientId: "9b3a36201ec44b3997b96cda5eb09785",
    clientSecret: "4764fb6f7d654dcab3fc3c041af6640b",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No lyrics found"
    console.log(lyrics);
    res.json({ lyrics })

})

app.listen(3001, () => {
  console.log("runnning on 3001");
});
