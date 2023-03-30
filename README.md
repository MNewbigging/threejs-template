# threejs-template

# Github Pages #

This repo uses an action workflow to automatically deploy anything pushed to the main or master branch.

To setup, you must:
- Open `vite.config.ts` and edit the `base` property to read `/<your-repo-name>/`
- In Github, go to your repo > Settings > Pages > Build and Deployment and under the Source dropdown, choose Github Actions

