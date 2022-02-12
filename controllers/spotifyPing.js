const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node');


router.post("/spotifyRefresh", (req, res) => {
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
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
  
 router.post("/spotifyLogin", (req, res) => {
    console.log("logged in on spotify");
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
  
    spotifyApi.clientCredentialsGrant()
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
  
  router.get('/lyrics', async (req, res) => {
      const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No lyrics found"
      console.log(lyrics);
      res.json({ lyrics })
  })

  module.exports = router