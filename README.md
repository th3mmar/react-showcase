# Template: React, TS, and more

[![concourse.odeko.com](https://concourse.odeko.com/api/v1/teams/main/pipelines/template--react-ts-and-more-main/jobs/test/badge)](https://concourse.odeko.com/teams/master/pipelines/template--react-ts-and-more-main)

Here is a template configured w/ the following:
- TypeScript
- React
- Redux
- ThemeUI
- GraphQL (via Urql w/ codegen)
- Testing (Jest for Unit, Cypress for E2E)

## For more documentation on tooling,
- refer to [tools.md](./docs/tools.md) for a more detailed overview

The demo app is a very rough music single page app with pages to browse your music, albums, artists, and add albums and artists.
The idea behind it is you can view albums and artists and add them to your collection which is viewable on the home page

## Get up and running
- Install node v16.13.0
    - May I recommend [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you do not have a preferred Node version manager?
        - run `nvm use` to auto-install and switch to the Node version used here
        - alternatively, look into [this section](https://github.com/nvm-sh/nvm#deeper-shell-integration) of the NVM docs to configure auto-install/switching based on the directory
- Install dependencies with `npm i`
- Start the app! `npm run start`

## Regarding CI pipelines
Run the `setup-ci.sh` shell script.
It may ask you to log into the Odeko concourse site.
On completion the script will prompt you with a few extra steps to configure the repo to use the pipelines.

## Environment variables
Add any environment variables to the `env.js` file and reference them using `window.env.MY_VAR` in the codebase.
The reason for this approach is to prevent having multiple Docker images per environment.
If we were to use `process.env` we would have to inject any environment variables into the Dockerfile somehow since the product of this repo is a built React app.
This would result in having multiple Docker images that differ only slightly.
