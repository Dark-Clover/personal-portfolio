#!/bin/bash

# Build script for Usman's portfolio

echo "Starting build process..."

# Clean previous build
echo "Cleaning previous build..."
rm -rf .next out

# Install dependencies if needed
if [ "$1" == "--install" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the project
echo "Building project..."
npm run build

echo "Build complete! Static files are in the 'out' folder."
echo "To preview the site, run: npx serve out"
