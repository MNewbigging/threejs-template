# ThreeJs Playground

This is where we can experiement with ThreeJs features and ideas and follow the ThreeJs Journey course.

In this repo, we use:

- Webpack 5
- Typescript
- React
- MobX
- Sass
- ThreeJs
- Prettier

# To run locally

```
npm install
```

```
npm start
```

# Contributing

This repo is used by the whole team, so there are some things to be aware of when contributing:

- The general app setup is already in place, which provides the update loop & auto camera and renderer resizing in `AppState`
- The side drawer is used to list scenes you want to swap between. You don't have to add to this, but it would be nice to see what you've been up to.
- Contributions will be mostly kept within the scenes you make (see below)
- Do stuff on a branch and PR into dev as normal

## Scenes

Any work you do in this repo should be mostly contained within scenes, which are used as states in a finite state machine inside `AppState`.

There is an abstract base class named `BaseScene` which you should extend to create your own scene - it includes the `THREE.Scene` object.

The basic steps for setting up and running your scene are:

- Under the `scenes` folder, create a new sub-folder with the name of your scene
- Create a new file to contain your scene logic, e.g `my-scene.ts`, then a new class that extends `BaseScene`
- Implement the required abstract members of `BaseScene`:
  - `initScene` is where you put any setup; lighting, camera setup, spawning items in the scene etc
  - `updateScene` is called each frame; any realtime logic goes in here
  - `destroyScene` is called when moving to a new scene and should hold cleanup logic where you dispose of your scene resources
  - `camera` is a getter where you should return a camera; you'll need to create the camera yourself and hold it in your scene class
- In `AppState`, you can set `this.activeScene` to an instance of your scene inside the setup function (comment out the call to `selectScene` if doing this)
  - This is just a quick way to get your scene running, which you'd do on a branch since we should keep the `selectScene` call on the dev branch, recommend
    adding to scene list drawer when merging to dev (see below)

## Scene Drawer and Info Dialog

The side drawer provides a list of our scenes which we can swap between by clicking on them. This is a great way for us to see what we're up to easily.

To add your scene to the side drawer:

- Add an entry into the `SceneName` enum to give your scene a name
- In `AppState::selectScene`, add a case to the switch which inits your scene to `activeScene`

The drawer also has a few buttons to the side of it, which hide when the drawer is closed but can be hovered over to reveal them. They are:

- Open/close toggle; opens/closes the drawer
- Scene info button; opens the scene info dialog
- Fullscreen button; enters fullscreen mode (press escape to exit)

The Scene Info dialog is where you can write a few lines describing your scene and any commands/hotkeys it might have for other people viewing it.

To create scene info:

- Create a new React component file in your scene folder
- Add content to your component - whatever you want to say about your scene
- Open up `SceneInfoRenderer.tsx` and add a case that returns your scene info component
