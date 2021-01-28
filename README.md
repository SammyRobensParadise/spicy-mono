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