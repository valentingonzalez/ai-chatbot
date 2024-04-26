#!/bin/sh

PATH="/home/heyads/node-v16/bin:$PATH" yarn -v
PATH="/home/heyads/node-v16/bin:$PATH" yarn install
PATH="/home/heyads/node-v16/bin:$PATH" yarn build

rm -rf public-site
cp -R dist public-site
