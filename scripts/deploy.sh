#!/bin/bash

npx webpack --config webpack.production.js
cd dist;
sls deploy