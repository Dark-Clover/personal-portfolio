#!/bin/bash

# Script to build and export the project

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Build complete! Static files are in the 'out' folder."
echo "To preview the site, run: npx serve out"
