<!-- PROJECT LOGO -->
<p align="center">
  <div align="center">
    <a href="https://github.com/jasanpreetn9/Codex/">
      <img width="150" src="https://github.com/jasanpreetn9/Codex/blob/master/static/favicon.png?raw=true" alt="Logo">
    </a>
    <h3>Codex - Watch animes online</h3>
  </div>

  <hr />

  <p align="center">
    The open-source anime streaming service made with SvelteKit. It lets you search, watch animes without any ads with a beautiful UI. It can be self hosted or deployed online.
  </p>
</p>

<!-- PREVIEW IMAGE -->
<img src="https://github.com/jasanpreetn9/Codex/blob/master/static/webPreview.png?raw=true">

<hr/>

## Acknowledgements

<!-- API INFO -->

Consumet is the underlying public free API's that are used for fetching the data about animes. [consumet/[api.consumet.org](https://github.com/consumet/api.consumet.org)] is used for scraping video sources.

## Online Deployment

Following are the recommended online deployment services which are tested to work with this project. If you want to add a deployment service just open an issue.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

[![Deploy with netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com)

## Local Deployment

You need to have `nodejs` and `git` installed on your pc for following the intructions

First download the repository using
```
git clone https://github.com/jasanpreetn9/Codex.git
```


This should download this repository to your computer. Next, to download the dependencies run
```
npm install
```

Now build and start the production build of the site using
```
npm build
```

This will start the app on http://localhost:5173
