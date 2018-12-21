# Creighcl-react-starter

## Required to Build:

**NPM Global Installs**
- gulp
- eslint
- karma-cli , 
- firebase-cli

**Config Files (not provided)**

For Firebase configuration help, see the docs: https://firebase.google.com/docs/

`.env.development` and `.env.test` files should contain key/val pairs

```
FIREBASE_API_KEY=Something
FIREBASE_AUTH_DOMAIN=Something
FIREBASE_DATABASE_URL=Something
FIREBASE_PROJECT_ID=Something
FIREBASE_STORAGE_BUCKET=Something
FIREBASE_MESSAGING_SENDER_ID=Something
```

## Unit Testing
Through Jasmine/Karma/Enzyme in test folder: **/*Spec.js

## Commands
**Gulp Tasks**

- gulp lint : fail fast linting of src and test folders
- gulp linter : lint on watch loop
- gulp test : runs full UNIT test sweep in Jasmine
- gulp TDD : begins running Karma Server for TDD
- gulp validate runs: lint, test

**NPM Scripts**

- dev-server : runs webpack live server on port 8080
- build:prod : builds for Production into the /public folder
- start : runs flattened project from the /public folder
- validate : runs 'gulp validate'
