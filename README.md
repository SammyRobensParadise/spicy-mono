# spicy-mono
a _hopefully_ tasteful monorepo with react and component libraries

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
