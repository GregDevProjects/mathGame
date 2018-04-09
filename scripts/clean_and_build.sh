#!/usr/bin/env bash
# requires a cordova project one level down named mathGameCordova
npm run deploy
#clean
rm -rf ../../mathGameCordova/www
#build directory stucture and copy build folder
mkdir ../../mathGameCordova/www
mkdir ../../mathGameCordova/www/src
cp -R ../src/img ../../mathGameCordova/www/src/
cp -R ../build/* ../../mathGameCordova/www/