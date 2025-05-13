# threejs-template

To get started:

- npm install
- npm run start

# Github Pages

This repo uses an action workflow to automatically deploy anything pushed to the main or master branch.

To setup, you must:

- Open `vite.config.ts` and edit the `base` property to read `/<your-repo-name>/`
- In Github, go to your repo > Settings > Pages > Build and Deployment and under the Source dropdown, choose Github Actions
- Open `asset-manager.ts` to search & replace `repo-name-here` with your repo name

# Loading Assets

Drop your assets under the public folder, which is accessed in paths with a leading forward slash e.g `'/models/my-model.fbx'`

Add an entry for each asset into the corresponding enum in `asset-manager.ts`.

If there are any errors when loading, they will be written to the console log.

The general flow of the app is to wait until all loading has finished before starting the game.

# Adding UI

Note that the canvas is added to the DOM at the top; directly under the body element and therefore a sibling of the 'root' div, which holds all UI.

This means your UI will need to be layered above the canvas and you will have to manage pointer-events for any ui that would cover the canvas without being interactive.
