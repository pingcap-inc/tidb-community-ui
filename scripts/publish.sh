#!/bin/bash

set -e

pnpm run build:ui
pnpm run build:site-components

pushd packages/ui
npm publish
popd

pushd packages/site-components
npm publish
popd
