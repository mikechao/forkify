<h1 align="center">🍴forkify🍴</h1>
<p align="center">
  Search over 1,000,000 recipes with the ablity to bookmark and upload custom user recipes
</p>

[![Build Status](https://app.travis-ci.com/mikechao/forkify.svg?branch=master)](https://app.travis-ci.com/mikechao/forkify) [![codecov](https://codecov.io/gh/mikechao/forkify/graph/badge.svg?token=V2CT5HWZBH)](https://codecov.io/gh/mikechao/forkify) [![Known Vulnerabilities](https://snyk.io/test/github/mikechao/forkify/badge.svg)](https://snyk.io/test/github/mikechao/forkify)

Currently live at <a href="https://forkify-mike-chao.netlify.app/">https://forkify-mike-chao.netlify.app/</a>
<img src="/readmeAssets/forkify.jpg" alt="forkify screenshot"/>

## 🛠️ Installation Steps

1. Obtain a forkify api key [forkify-api](https://forkify-api.herokuapp.com/v2) and save it

2. Obtain a spoonacular api key [spoonacular](https://spoonacular.com/food-api) and save it

3. Clone the repository

```Bash
git clone https://github.com/mikechao/forkify.git
```

4. Change the working directory

```Bash
cd forkify
```

5. Create a .env file

```Bash
touch .env
```

6. Put the API keys from step 1 and 2 in .env

```Bash
FOKRIFY_API_KEY=key from step 1
SPOON_API_KEY=key from step 2
```

7. Install NPM packages

```Bash
pnpm install
```

8. Start dev server

```Bash
pnpm run dev
```

## 👷 Built with

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) : Programming language used!
- [Visual Studio Code](https://code.visualstudio.com/) : Integrated development environment
- [codingheroes](https://codingheroes.io/) : JavaScript learning course
- [Parcel](https://parceljs.org/) : For bundling and building
- [PnPM](https://pnpm.io/) : JavaScript package manager
- [Travis CI](https://www.travis-ci.com/) : For continuous integration and continuous delivery
- [Codecov](https://about.codecov.io/) : For code coverage tracking
- [snyk](https://snyk.io/) : For scanning for security vulnerabilities
- [Jest](https://jestjs.io/) : For writing tests and code coverage
- [Netlify](https://www.netlify.com/) : For hosting and servless functions
- [Github](https://github.com/ 'Github') : For Repo Storage and source code management
- [Git](https://git-scm.com/ 'Git') : For Version Control System
