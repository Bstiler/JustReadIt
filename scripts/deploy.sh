#!/bin/bash

yarn build;
gcloud functions deploy justreadit --project justreadit-282020 --runtime nodejs12 --trigger-http --entry-point app