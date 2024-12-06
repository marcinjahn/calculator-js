# Calculator in JavaScript

## What I did

You don't have to do those things! I show here the steps I made to create this repository.
If you want to run the code, go to the [How to use it](#how-to-use-it) section.

I hope you used node already. I think you did if I remember correctly from the past.
You will notice a few `npm` commands down below, because there're quite a few dependencies I had to
install.

1. Initialized the app:

```sh
npm init -y
```

I also created the `src/index.html` and `src/index.js` files.

2. Installed webpack with plugins:

```sh
npm install --save-dev webpack webpack-cli html-webpack-plugin style-loader css-loader
```

The first two packages are from <https://webpack.js.org/guides/getting-started>. The
`html-webpack-plugin` one is for managing HTML files (without it, webpack manages just JS files).
You can see that the `src/index.html` does not even import the JS file anywhere. Webpack will
modify this file to actually import the produced `bundle.js` file.
The `style-loader` and `css-loader` are for managing CSS files. The `style-loader` injects
CSS into the DOM (HTML). The `css-loader` resolves CSS imports (you can see that CSS is imported
into the JS file, webpack will understand it, and it will embed the CSS into the `bundle.js` file).
We could also make it so that the CSS file stays as a separate file in the output bundle, but the
task said to only have two files in the output: HTML and JS, so I'm following that.
Well, CSS could also be a part of HTML, it's a matter of taste I guess.

I also added the `build` script to `package.json`.

3. Installed webpack-dev-server

```sh
npm install --save-dev webpack-dev-server
```

I also added the `start` script to `package.json`.

It allows you to continuously regenerate the output bundle as you write new code.

4. I copied over your code and started modifying it.
5. I installed ESLint and Prettier and git hook:

```sh
npm install --save-dev eslint prettier  eslint-plugin-prettier lint-staged husky
npx eslint --init # I selected all the default options here
npx husky init # pre-commit hook setup
```

Then, I manually edited `.husky/pre-commit` to invoke `lint-staged` staged command.
`lint-staged` is a tool that takes only git staged files and pushes them through some
defined commands. You defined the commands in `package.json`, in `lint-staged` section (which I
did). In our case, on every commit the following will happen:

1. Prettier will be executed on the staged files (to fix formatting)
2. ESLint will be executed on staged files, potentially blocking us from creating a commit with some
   "bad" code. You can successfully commit only when the code is valid for ESLint.

While initializing ESLint, I selected the following options:

```txt
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · javascript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

I created `.prettierrc` file with some usual configuration.
I also created `eslint.config.mjs` with a configuration that integrates prettier with ESLint. By
default, some of prettier formatting might conflict with ESLint rules, so there's a special plugin
which fixes that. I used that plugin in the configuration file.

ESLint checks your code for various "smells" and rules that you can define.
For example, it can error when you use `var` instead of `let` and `const`. There are lots of
built-in rules. Prettier is a code formatter that makes the JS look "prettier". For example,
it will shorten the length of lines, etc.

Setting git hook will prevent you from pushing code that has ESLint errors to the repo.
Thanks to that, code in the repo should always be "clean".

## How to use it

### Install dependencies

```sh
npm install
```

This will install all the npm packages defined in `package.json`.

### Build

The files in `src` are the source files. In order to deploy it, you want to have
minimized set of assets (files). Since this is a web app, you want your users to
get your app as quick as possible, therefore we're using webpack. It allows us to take the contents
of `src` and turn it into minimized assets in `dist` (distributable).
Webpack has a configuration file `webpack.config.js` that tells it how to do that.
It introduces webpack which files it should look at to generate `dist`.

To build the app, run `npm run build`.

### Development

While working on the app, you can continuously build it as you introduce changes.
Just run `npm run start` and a small web server will be started serving the files from `dist`.
Webpack will regenerate `dist` anytime you modify your code in `src`.

### Deployment

I spent more than two hours on the things above, didn't have time to set up deployment :(
Do let me know if you want me to work on that. Shouldn't take me more than 0.5h I guess.

### Code Modifications

- I updated all your code documentation (descriptions of functions) to use the
  [JSDoc](https://jsdoc.app/) notation. It is useful, because various tools integrate with JSDoc. For
  example, in VS Code, when you try to invoke some function that has JSDoc, VS Code will display
  the function description in a small popup.
- I separated presentation code (`index.js`) from business logic (`math.js`). In general it's a good
  idea to keep those separate, since UI and business logic are two separate concerns. One can evolve
  without the other. In our case, probably the "business logic" (all the math) will stay the same,
  but the UI might evolve rapidly. Keeping them separate simplifies testing, and keeps the code
  cleaner.
- I created a bunch of functions in `index.js` to:
  - document the code a bit more (a function name shows what the code is supposed to do)
  - simplify the `updateDisplay` function. It had too many responsibilities before.
- I updated the code of the `calculate` function to operate on numbers and not strings. This is a
  business logic, and math uses numbers, not strings.
- in CSS, I added rounding to the "0" button
- I added light/dark themes, you can see those in CSS. In HTML I added 2 simple buttons, you could
  probably improve this implementation, I wanted to keep it simple. In JS, you can find a simple
  function `setupThemeSwitcher` that configures the theme switching. The CSS relies on data
  attributes, and the JS just changes the value of the attribute to `light` or `dark`. You could
  add more themes if you wanted to do so.

### Remarks

You might notice that this repo does not contain the `dist` directory, where the webpack output is
supposed to be. This is intentional. We do not publish build results in the code repository, similar
to how we don't include `node_modules` there.
You can create the `dist` directory by following the [How to use it](#how-to-use-it) section.

If questions come up, you know where to find me.
