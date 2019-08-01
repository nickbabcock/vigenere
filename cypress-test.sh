#!/bin/bash

set -euo pipefail

docker build -t nickbabcock/vigenere .
ID=$(docker run -d --rm -p 11800:80 nickbabcock/vigenere)

finish() {
  docker stop "$ID"
}
trap finish EXIT

npx cypress run
