# Shine
## Vue Web Components


[![Node](https://img.shields.io/badge/Node-v10+-red.svg)](https://bitbucket.org/belk_ecom/shine/src/master/)
[![Vue](https://img.shields.io/badge/Framework-Vue-orange.svg)](https://bitbucket.org/belk_ecom/shine/src/master/)
[![Contrib](https://img.shields.io/badge/Contributors-2-yellow.svg)](https://bitbucket.org/belk_ecom/shine/src/master/)
[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://bitbucket.org/belk_ecom/shine/src/master/)
[![Webpack](https://img.shields.io/badge/Bundle-Webpack-blue.svg)](https://bitbucket.org/belk_ecom/shine/src/master/)


### Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Contact](#contact)



### About The Project
Shine creates a local component library that can be managed and deployed as template-component bundle.



#### Built With

* [Vue](https://vuejs.org)
* [Vue Custom Element](https://github.com/karol-f/vue-custom-element)
* [HammerJS](https://hammerjs.github.io/)
* [Webpack](https://webpack.js.org)
* [Basicss](https://basicss.com)



### Getting Started

Configuring your system to work with Shine is simple. We use yarn instead of npm because it flat-packs NPM modules. This saves space on dependencies and is just faster in general. `brew install yarn`

After yarn is installed, navigate to the Shine project folder and run `yarn install`

Once the packages are installed, raise your local dev environment and documentation by running `yarn dev`


#### Prerequisites
* [yarn](https://yarnpkg.com/lang/en/docs/install)
* [node 10+](https://nodejs.org/en/)

```sh
brew install yarn
```

#### Installation


### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn dev
```
**IF YOU HAVE A CORE-JS DEPENDENCY ERROR AT THIS POINT, RUN** `yarn install core-js@2`

### Compiles and minifies for production
```
yarn build
```

### Compiles and minifies for dev server
```
yarn build:dev
```

### Run your tests
```
yarn test
```

### Lints and fixes files
```
yarn lint
```

### Generate a new component
```
yarn generate
```

---

### Shine for Belk

Web Components are the future of front end development. The web component provides an API for developers to create new HTML elements. Styling and composition is encapsulated within the Shadow DOM; HTML templates are stored and instantiated via JavaScript.

**What JS?** Vue is a lightweight open-source JS framework for building user interfaces and single-page applications. **Why?** Combined with a Web Component architecture you get a data-reactive templating/content system with SEO-friendly content slotting; your content is rendered on the server and enhanced for the client. 

**What CSS?** OO classes show their worth time and time-again by helping us standardize basic style patterns like spacing (padding/margin/typography) and gives us (and the "prod" team) access to modify content in any way they wish without writing new CSS [that may conflict with or slow the render of the page]. **Why?** You write less CSS overall. The separation for what SHOULD be OO and what SHOULD be component style is just that -- Web Components will utilize SCSS variables to style content. These variables are linked to the OO classes. 

**What standards?** Code control is imperative at an organization of this size. Enforcing simple things such as environment configurations for tab structure and code style is essential. This package handles most of this for us through automatic linting -- but we still need to draft and implement an actual code style guide. **Why?** Making the code look like it was written by a single person removes all confusion of how things should be done when a new developer is introduced to the project.

The framework is a distillation of these forward-looking and scalable principles... and this is where it gets the name Moonshine, affectionately known as "Shine".

**Perk: Shine components can even be exported for use in mobile environments like Android and iOS! This means 70-80% code re-use cross platform!**


---

### Generating new components

Simply type `yarn gen`, press enter, and follow the on-sctreen instructions. 

A file/folder structure will be created that matches whatever name you gave it. Typically, re-usable utility components are created with a simple one-word name: "Tooltip" for instance, would create a `sh-tooltip` component and all of the files needed to make it work. 

Feature components can be named more specifically: "Belk Header" would generate a `belk-header` component for example.

**Custom elements must be hyphenated to adhere to WC3 standards.**

---

### Custom CSS Properties

Shine comes with a theme loader that builds out extra fallback CSS for IE11 and other browsers that do not support Custom CSS Properties. Any `$hyphenated-variable` will be checked to see if it has an associated `--hyphenated-variable`. If it does, a progressive enhancement feature includes it after the reference, which overrides the reference in the cascade.

---

### Deploying Code

The entire framework is semtantically versioned (MAJOR.MINOR.PATCH) so that developers can easily track changes against projects in flight. e.g, if a patch hits a component there is generally no work to do. Minor changes may require updates, while Major version changes always require the developer to re-test their implementations.

Two files exist for separation between components in development and components in production, these are `dev-components.js` and `prod-components.js` respectively.  **Only the components in the prod file will be built outside of the dev environment.**

To configure automatic deployment to your local ecom repo, open the `.env` file in the root of the project and edit the paths to match your repo installation.

Now just run `yarn build` and all of your changes will be deployed for testing... 

When you are happy with your tests, submit a PR to the Shine repo. Once merged to master, you will be able to generate code for submittal to the belk repo (we want to make sure everyone's changes are included for publishes to dev!) -- feel free to have your specific changes tested in your sandbox in the meantime though. 

---

### Component Library

`yarn dev` will build and launch the component library. Here you will find at least one page per component with documentation including references on attributes/events and example implementations. 

Ideally, we build/deploy this library to a place where anyone (developer OR designer) can access it as a reference for how components display or react in different situations.

This will give us a way to make suggestions to the offshore team... "Use *this component* with *this variant* to achieve that design" for example.

---

### Contributing

Any contributions you make are **greatly appreciated**.

1. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
2. Commit your Changes (`git commit -m 'Add some Amazing Feature`)
3. Push to the Branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

