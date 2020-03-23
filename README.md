EESSI Pensjon UI components 
===========================

EESSI Pensjon UI is a collection of React components developed within the scope of EESSI 
Pensjon.
 
Initially meant to be reused by the different EESSI Pensjon frontend applications, 
any NAV frontend application can use these components.

To set this library as a dependency to your project, add this line in the 
`dependencies` object in your `package.json` file:

    "eessi-pensjon-ui": "https://github.com/navikt/eessi-pensjon-ui#{tag}"
    
Make sure to replace `{tag}` with the latest Git tag. 
    
There is a <a href="//navikt.github.io/eessi-pensjon-ui/build/index.html">examples page with all the components</a> hosted in this Git repo.

For the client user, that is all you need to do. For the developer who wants to run locally the code and improve it, then keep reading. 

## TL;DR

    git clone git@github.com:navikt/eessi-pensjon-ui.git 
    npm install
    npm run start

## SETUP

Make sure you have installed: 

* [Git](//git-scm.com)
* [Node.js](//nodejs.org) 
* [NPM](//npmjs.com) (normally comes with the Node.js package above)

Also, make sure you have read access to [github.com/navikt](//github.com/navikt)

## DOWNLOAD

To clone this repo, go into your local working directory, and run (HTTPS) 

    git clone https://github.com/navikt/eessi-pensjon-ui.git
    
or (GIT+SSH)
    
    git clone git@github.com:navikt/eessi-pensjon-ui.git 

With HTTPS you may have to provide username/password, with git+ssh your private key can be used for authentication.

You should see a {workDir}/eessi-pensjon-ui directory with the source code. 

## INSTALL 

Installing reads `package.json` and `package-lock.json` to gather all dependency modules, downloads them from npm repository site and saves them in `node_modules` directory.
 
To install, run: 

    npm install
     
if you just cloned this repository, or everytime there is code update that changes `package.json` or `package-lock.json`. This commend installs the dependencis for the project. 

`package.json` is the file where project dependencies (and dev dependencies) are listed.

`package-lock.json` is the file that locks dependency versions into this project's version.

In the end, you should see a npm summary output with all dependency packages installed, and an audit report. 

## AUDIT 

This step is optional and not necessary if you are planning to do only local development. 

If you are planning to do a production build, it is recommended to run npm audit to check if all 3rd party dependencies have no vulnerabilities.

To run the audit, do:

    npm audit 
 
Ideally it should output:  

    found 0 vulnerabilities
    
If vulnerabilites are found, run:
    
    npm audit fix     

If the vulnerabilities can't be fixed, npm lists them and tells the user to solve them manually. 

This happens when the other libraries depend on a (now vulnerable) dependency version, but the library author hasn't updated it yet.

To circumvent that, we can force npm to ignore that specified (and vulnerable) version and install instead a different version. 

To do that, check `package.json` for a `resolutions` key and add the dependency package. For example: 
  
     "resolutions": {
         "acorn": "^7.1.1",
         "minimist": "1.2.3",
         "extend": "3.0.2",
         "cryptiles": "4.1.2"
     }

Is telling npm to install the 3.0.2 version of the `extend` library, even if somewhere in the `package-lock.json` there 
is a dependency that requires a difference version. 

To Perform these overrides, run: 

    npm run npx

## TEST

Run tests with
 
    npm run test
    
This runs all tests in watch mode, that is, after all tests finished the console is watching for changes in code so it can re-run tests again. 

To run a subset of tests, add a pattern on the -t flag, as in
 
    npm run test -t components/Alert
    
For coverage report, run
 
    npm run test:coverage
    
Coverage tests don't run in watch mode.    

## LINT

Linting code makes it tidy, clean, indented and pretty.

To lint the code, run 

    npm run lint

To fix lint issues, run 

    npm run lint:fix

Note that if code is properly linted, the command outputs nothing.

## RUN 

To start the app locally in development mode, run 
     
    npm run start
     
This will launch a webpack server on port 3001 and launch a window/tab in your predefined browser.

Code will run in watch mode, so any changes made to code files will trigger a page reload.
 
If you want to change the default port, change this line in `package.json`:

    "start:js": "cross-env PORT=3001 NODE_OPTIONS=--max-old-space-size=8192 react-scripts start"

### BUILD

To build the app ready for production, run 

    npm run build
    
The build step generates the <a href="//navikt.github.io/eessi-pensjon-ui/build/index.html">examples page with all the components</a>.

You can see how it looks locally by running

    serve -s build

then visit `localhost:5000`.

### DIST

To create a distribution module for production with all the components in a way that can be reused by other projects, React or non-React, run:

    npm run dist

Note: If you ran `npm run build` before, then the `react-scripts` would have changed the `tsconfig.json` file to have the line: 

    'noEmit': true

Remove this line before running `npm run dist`, to ensure that the distribution step emits declaration (*.d.ts) files.

If you need to do debugging in the `eessi-pensjon-ui` inside other project, then you can create a development distribution, which does not compact code 
and adds source maps. with:

    npm run dist:dev
 
Dist files will be bigger, but easier to debug.  
 
### DEPLOY 

If an important change is done, then it is necessary to create a new dist and add a new tag so that the other NAV projects can refer to that new commit.

The recipe is as follows: 

    ncu -u // Update packages. ncu is npm-check-updates, you can install it globally as npm install --global npm-check-updates 
    npm install // install new packages
    npm run start // run locally while developing
    // When new feature/bug fix is done: 
    npm run lint:fix // lint code
    npm run test // run tests
    npm run build // create a build, you will see a new build directory
    remove `noEmit: true` line from tsconfig.json 
    npm run dist // create a dist, you will see a new dist directory
    change version number in package.json
    git add . // stage all file changes
    git commit -m 'Message' // Add a commit 
    git tag 'X.X.X' // Add a version tag
    git push --tags origin master // push code along with new tag

## Troubleshoot

None at the moment
    
---

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #eessi-pensjonpub.

