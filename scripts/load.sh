#!/bin/bash

yarn build;
node -e "const app = require('./lib/index.js').app; app.listen(4000); console.log('Server Started')"
