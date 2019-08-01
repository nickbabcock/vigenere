#!/bin/bash

set -euo pipefail

npm run build
npm run css

# Poor man's asset pipeline
asset_pipeline() {
  FILE="$1"
  FILE_EXT="${FILE##*.}"
  FILE_NAME="${FILE%.*}"
  SHA=$(sha1sum < "public/$FILE" | cut -d' ' -f1)
  NEW_FILE="$FILE_NAME-$SHA.$FILE_EXT"
  mv "public/$FILE" "public/$NEW_FILE"
  sed -i -e "s/$FILE/$NEW_FILE/g" public/index.html
}

cp src/index.html public/index.html

asset_pipeline bundle.js
asset_pipeline styles.css
