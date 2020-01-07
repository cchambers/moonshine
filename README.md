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

#### Mac Dependencies
  - Open a command line: `CMD+SPACE` will cause the 'Spotlight' input to open. Type "term" and select "Terminal".
  - Install XCode Command Line Tools: type `git --version` in the command line. If you don't have git installed, the command line tools install will kick off.
  - Install Homebrew: paste this into your command line `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  - Once homebrew is installed, you will want to close the current command line and open another.
  - Optional: Install ZSH: `brew install zsh` (helps with automatically switching node versions for multiple projects)
  - Install NVM via command line: `brew install nvm`
  - Install Yarn via command line: `brew install yarn`
  - Close the command line, open another...
  - Install Node 10 via command line: `nvm install 10`

#### Install Shine
  - In your command line interface, navigate to the folder that you want the Shine project to reside in. ex: `mkdir Sites | cd Sites`
  - Clone the shine repo: `git clone git@bitbucket.org:belk_ecom/shine.git`
    ++ IF REPO ACCESS MUST BE REQUESTED: 
  - Navigate to the new project folder: `cd shine`
  - Type `yarn install`. This will initialize the project dependency installation. 

#### Start Shine Dev Server
  - In the shine project folder, type `yarn dev`.
  - When you want to end the process, use CTRL+C.



### Commands

#### Compiles and hot-reloads for development
```
yarn dev
```
**IF YOU HAVE A CORE-JS DEPENDENCY ERROR AT THIS POINT, RUN** `yarn install core-js@2`

#### Compiles and minifies for production
```
yarn build
```

#### Compiles and minifies for dev server
```
yarn build:dev
```

#### Run your tests
```
yarn test
```

#### Lints and fixes files
```
yarn lint
```

#### Generate a new component
```
yarn gen
```

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

