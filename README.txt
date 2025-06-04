Amazer
======

This repository contains "Amazer", an ImpactJS game.

## Project structure

- `index.html` – boots the game and loads Impact and the game module.
- `lib/` – JavaScript code: the Impact engine (`lib/impact`), game-specific logic (`lib/game`), plugins (`lib/plugins`), and the Weltmeister level editor (`lib/weltmeister`).
- `media/` – images, sounds and fonts used by the game.
- `tools/` – build scripts for bundling and minifying the game.
- `gulpfile.js` – wraps the build process.
- `weltmeister.html` – the level editor.

## Main game code

`lib/game/main.js` defines the `AmazerGame` class. It loads core modules, the map, player entity (`Man`), the tween plugin and all level modules. The game initialization sets up music, input bindings and level handling.

`lib/game/map.js` manages levels and floors, spawns entities and maintains collision maps. Entities derive from `MapEntity` (`lib/game/engine/map-entity.js`) which handles tile positioning and visibility.

## Entities and levels

Game objects live under `lib/game/entity` (e.g. `Man`, `MovingWall`, `Gun`, `Spikes`). Level modules in `lib/game/levels/` contain JSON data describing tiles and entity placements.

## Build and deployment

Development does not require building—open `index.html` in a browser to play. For a minified package run `tools/bake.sh` or `gulp build`. The bake script merges Impact and game code into `build/game.min.js` and copies assets to the `build` directory.

Existing commands from the original README:

```
cd build && ./../tools/bake.sh && cd ../
~/Dropbox/game/tools/itch.io.sh build upgradeyourskull/amazer:html5
```

## Next steps for newcomers

1. **Run the game**: open `index.html` in your browser.
2. **Explore the code**: start with `lib/game/main.js`, then inspect `lib/game/map.js` and entities under `lib/game/entity`.
3. **Modify levels**: use `weltmeister.html` to edit levels stored in `lib/game/levels`.
4. **Build for distribution**: run the bake script or `gulp build` to create `build/game.min.js` and copy assets.
5. **Learn more about ImpactJS**: the engine lives under `lib/impact`; consult the official docs to extend the game.
