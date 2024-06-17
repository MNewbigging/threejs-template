# threejs-template

To get started:

- npm install
- npm run dev

# Github Pages

This repo uses an action workflow to automatically deploy anything pushed to the main or master branch.

To setup, you must:

- Open `vite.config.ts` and edit the `base` property to read `/<your-repo-name>/`
- In Github, go to your repo > Settings > Pages > Build and Deployment and under the Source dropdown, choose Github Actions

# Loading Assets

Drop your assets under the public folder, which is accessed in paths with a leading forward slash e.g `'/models/my-model.fbx'`

There are various loader classes responsible for loading different types of assets, all controlled by the top-level `GameLoader` class.

If there are any errors when loading, they will be written to the console log.

The general flow of the app is to wait until all loading has finished before starting the game.

