# Omelet

Website built with [Nuxt3](https://nuxt.com), [Sanity.io](https://www.sanity.io) and [Netlify](https://www.netlify.com).
[![Netlify Status](https://api.netlify.com/api/v1/badges/a7975a31-5a81-4118-aa98-46343508eaf1/deploy-status)](https://app.netlify.com/sites/omelet/deploys)

## Build Setup

In your terminal application, open two tabs. The first tab is for Nuxt3 development, the other for Sanity development.

#### Tab 1:

```bash
# cd to nuxt folder
$ cd <your-path-to-projects>/omelet/nuxt

# if not already installed, install NVM 20.18.0
$ nvm install 20.18.0

# set nvm to 20
$ nvm use 20
```

<p style="color:gray">*If need be, add .env file to root of this folder with variables from Consume & Create...*</p>

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

View your local Nuxt3 development at http://localhost:3000

#### Tab 2:

```bash
# cd to sanity folder
$ cd <your-path-to-projects>/omelet/sanity

# if not already installed, install NVM 20.18.0
$ nvm install 20.18.0

# set nvm to 20
$ nvm use 20
```

<p style="color:gray">*If need be, add .env file to root of this folder with variables from Consume & Create...*</p>

```bash
# install dependencies
$ npm install

# if you don't have @sanity/cli installed, install it globally
$ npm install -g @sanity/cli

# serve with hot reload at localhost:3000
$ sanity dev

# deploy / sync Sanity changes to studio (live / production)
$ sanity deploy
```

View your local Sanity development at http://localhost:3333  
Live dashboard at https://omelet-website.sanity.studio
