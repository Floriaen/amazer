#!/bin/bash
IMPACT_LIBRARY=lib/impact/impact.js
GAME=lib/game/main.js
OUTPUT_FILE=build/game.min.js
cd ..
php tools/bake.php $IMPACT_LIBRARY $GAME $OUTPUT_FILE
rm -rf build/media && cp -r media build/
