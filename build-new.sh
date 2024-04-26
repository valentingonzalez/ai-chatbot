#!/bin/sh

PATH="/home/ecommerce/node18/bin:$PATH" /home/ecommerce/node18/bin/yarn install
PATH="/home/ecommerce/node18/bin:$PATH" /home/ecommerce/node18/bin/yarn build

if [ -f dist/index.html ]; then
    echo Copying dist
    rm -rf public-site
    cp -R dist public-site
fi
