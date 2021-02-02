# spicy-mono
A tasteful monorepo with react and component libraries 🌶 
## Running

### The app
The app is not yet containerized.
```bash
cd app && yarn start # runs on localhost:3000
```

### The Library
```bash
cd library

make library # will build a docker image and spin up a docker container at localhost:6006

```
Run `make help` for a full list of possible commands
```bash
make help
```
#### Optional:
Interact with `Docker` directly

Access the library directly
```bash
docker exec -it $(docker ps -a -q  --filter ancestor=library) /bin/bash
```
Build the library
```bash
docker build -t library .
```
Start the library container
```bash
docker run -p 6006:6006 -d library
```
Stop the library container 
```bash 
docker container stop $(docker ps -a -q  --filter ancestor=library)

# or

# list the CONTAINER IDs
docker ps
# stop the container
docker container stop <CONTAINER_ID>
```
## Structure

This is a proof-of-concept project to determine the codeability of a monorepo containing both a component library and react app(s) created using create-react-app, It uses [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://yarnpkg.com/cli/workspace#gatsby-focus-wrapper) to manage the multi-project node environment. 

### The file structure is the following:

```
| spicy-mono
    | app (CRA)
     -- | package.json
     -- | node_modules
     -- | src
     -- | tests
     -- | ...
    | library
     -- | package.json
     -- | node_modules
     -- | .storybook
         -- | package.json
         -- | node_modules
         -- | ...
     -- | ...
 -- | package.json
 -- | lerna.json
 -- | node_modules (global)
```

## Caveats
 See [naming issue](https://github.com/lerna/lerna/issues/1416)

 ## Commands

 To run yarn commands use
 ```
  $ yarn workspace <workspace_name> <yarn_command>
 ```

Yarn workspaces and Lerna will automatically reconcile common `node_modules` and dependencies, although sometimes issues may arise with conflicting versions of dependencies. If this the case, add the package name to the root `package.json` `nohoist`. This will tell Yarn workspaces not to reconcile the package as a common dependency

```
# package.json
{
    ...

      "workspaces": {
    "packages": [
      "library",
      "app"
    ],
    "nohoist": [
      "**/babel-loader/**",
      "**/babel-loader",
      "babel-loader"
    ]
  },

  ...
}
```


## Project Replication (from scratch)
### Setup
1.  Initialize Git repo and initialize with yarn
```
mkdir spicy-repo && cd spicy-repo && git init && yarn init
```
2. Add workspaces to root `package.json` and set them to be private workspaces
```json
/* package.json */
{
  ...

    "workspaces": {
    "packages": [
      "library",
      "app"
    ],
    "nohoist": [
      "**/babel-loader/**",
      "**/babel-loader",
      "babel-loader"
    ]
  },

  ...

}
```
3. Install [Lerna](https://github.com/lerna/lerna) as a dev dependency
```
yarn add -D lerna
```
4. Initialize Lerna in root of directory for independently versioned packages. This will create a `lerna.json` and add Lerna as a devDependency to the `package.json`
```
lerna init --independent
```
5. Configure Lerna to play-nice with Yarn Workspaces
```json
/* lerna.json */
{
  "packages": ["library/*","app/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true,
  "command": {
    "publish": {
      "conventionalCommits": true,
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com",
      "allowBranch": "main"
    }
  }
}
```
### Create Typescript React App

6. Install a boiler-plate typescript create-react-app called `app`
```
yarn create react-app app --template typescript
```
7. Ensure create-react-app was initialized correctly
```
cd app && yarn start
```

### Create Storybook and Components
8. In the root directory (spicy-mono in this case) create a directory called `library/` and install storybook inside it.
```
mkdir library && cd library && npx -p @storybook/cli sb init --type react
```
9. Add typescript support to the library. Inside `library/`
```
yarn add -D fork-ts-checker-webpack-plugin typescript
```
10. Add presets to `.storybook/main.js`
```js
// .storybook/main.js
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/preset-typescript"
  ],
  typescript:{
    check:false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions:{
      shouldExtractLiteralValuesFromEnum:true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName):true)
    }
  }
}
```
11. Add typescript configuration to `library/`
```json
/* library/tsconfig.json */
{
    "compilerOptions": {
      "declaration": true,
      "declarationDir": "build",
      "module": "esnext",
      "target": "es5",
      "lib": ["es6", "dom", "es2016", "es2017"],
      "sourceMap": true,
      "jsx": "react",
      "moduleResolution": "node",
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true
     },
    "include": ["src/**/*"],
    "exclude": [
     "node_modules",
     "build"
    ]
   }
```
12. rename the `stories` directory to `src` and convert all `.js` and `.jsx` files to `.tsx` and `.ts` files.

13. Inside the `library/` directory, you should now be able to run storybook.
```
yarn run storybook
```
### Create a build artifact with your components
14. Install `rollup.js`
```
yarn add @rollup/plugin-commonjs @rollup/plugin-node-resolve rollup-plugin-peer-deps-external rollup-plugin-typescript2 rollup-plugin-styles -D
```
15. create a `rollup.config.js` file in the `library/` directory
```js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import styles from "rollup-plugin-styles";

import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), styles()],
};
```
16. Add build dependencies and scripts to the `package.json`
```json
/* package.json */
{
...

  "main": "./build/index.js",
  "module": "./build/index.es.js",
  "peerDependencies": {
    "react": "16.13.1",
    "react-dom": "16.13.1"
  },
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "build": "rollup -c"
  },

...
}
```
17. Add `eslint` to the library. In `library/`:
```
yarn add eslint eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser -D
```
18. Add `prettier`
```
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```
19. Configure `.eslintrc`
```json
/* .eslintrc */
{
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "extends": [
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    "rules": {}
  }
  ```
19. Optional: Add Jest
```
yarn add @types/jest @types/node jest ts-jest eslint-plugin-jest -D
```
20. Add `jest.config.js`
```js
module.exports = {
  roots: ["library/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  preset: "ts-jest",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
```
21. Add `react-testing-library`
```
yarn add @testing-library/react @testing-library/jest-dom @types/testing-library__react -D
```
### Create a storybook build and use it in the react app.
22. In the `library/` build the the components. This will create a `library/build` directory containing `.d.ts` and `index.es.js` files.
```
yarn run build
```
23. go to the app
```
cd ../app
```
24. Add library as a dependency of the `app`
```
yarn add <full_path>/spicy-mono/library
```
25. Then you can use the components in the `app` imported from `/spicy-mono/node_modules/library/build/index` or `/spicy-mono/app/node_modules/library/build/index` depending on how you have setup your `nohoist` config
```tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'library'
function App() {
  return ( 
    <Button
      backgroundColor="#4A90E2"
      primary
      size="small"
      label="button" />
  );
}

export default App;

```
### Time to get creating! 🛠 ⚡️ 🎉

![spicy](https://i.ibb.co/NmY9fF2/spicymemeee.jpg)

### References
Inspired by (and thanks to) these articles 📖:
- [Publishing and Installing Private GitHub Packages using Yarn and Lerna](https://viewsource.io/publishing-and-installing-private-github-packages-using-yarn-and-lerna/)
- [How to create a React component library with TypeScript, rollup.js and Storybook](https://medium.com/@dennisschneider/how-to-create-a-react-component-library-with-typescript-rollup-js-and-storybook-cc3fe95c9c44)
- [Setup a Create React App Monorepo](https://f1lt3r.io/create-react-app-monorepo-with-lerna-storybook-jest)
