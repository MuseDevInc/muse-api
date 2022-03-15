<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
<!-- PROJECT HEADER -->
<br />

<h1 align="center">Muse API</h1>

  <p align="center">
  Backend API created and deployed for the Muse App
    <br />
    <a href="https://muse-dev.herokuapp.com/"><strong>Explore the deployed app »</strong></a>
    <br />
  </p>


<!-- ABOUT THE PROJECT -->

## About The Project
Muse is an app that allows you to connect with people who have the same taste in music as you.

<a href="https://github.com/MuseDevInc/muse-app"><strong>Frontend repo on github is found here »</strong></a>

<p align="right">(<a href="#top">back to top</a>)</p>

### Models
User Model
  ```
  {
    username:{type:String, required:true},
    password:{type:String, required:true},
  }
  ```
Profile Model
  ```
  {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    location: { type: String },
    aboutMe: { type: String },
    favGenres: [{ type: String }],
    favAlbum: { type: String },
    favArtist: { type: String },
    favSongs: [
        {
        title: String,
        uri: String,
        artist: String,
        albumUrl: String,
        },
    ],
    swipedRight: [{ type: String }],
    swipedLeft: [{ type: String }],
}
  ```
Conversation Model
  ```
  {
    members: [{type: String}]
  }
  ```
Message Model
  ```
  {
    conversationId:{
        type:String,
    },
    sender:{
        type:String,
    },
    text:{type:String},

  }, {timestamps:true})
  ```


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

### Installation - Frontend

1. Clone the repo
   ```sh
   git clone https://github.com/MuseDevInc/muse-app
   ```

2. install modules
   ```sh
   npm install
   ```
3. Create your `.env` variables
   ```
    PORT=<>
    MONGODB_URI=<>
    SESSION_SECRET=<>
    REDIRECT_URI=<>
    SPOTIFY_CLIENT_ID=<>
    SPOTIFY_CLIENT_SECRET=<>
   ```
4. Run npm start
   ```sh
   // cd into the directory
   npm start
   ```


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Developers

- Charmille Dizon
- Christian Staubo
- Jordan Walsh
- Kahlil Sassa

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Heroku](https://dashboard.heroku.com/apps)
- [Noun Project](https://thenounproject.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/MuseDevInc/muse-api.svg?style=for-the-badge
[contributors-url]: https://github.com/MuseDevInc/muse-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MuseDevInc/muse-api.svg?style=for-the-badge
[forks-url]: https://github.com/MuseDevInc/muse-api/network/members
[stars-shield]: https://img.shields.io/github/stars/MuseDevInc/muse-api.svg?style=for-the-badge
[stars-url]: https://github.com/MuseDevInc/muse-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/MuseDevInc/muse-api.svg?style=for-the-badge
[issues-url]: https://github.com/MuseDevInc/muse-api/issues

