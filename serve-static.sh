#!/bin/bash

# Script to serve the static site after building

echo "Installing serve package if not already installed..."
npm install -g serve

echo "Serving the static site from the 'out' directory..."
serve -s out

echo "Your site should now be available at http://localhost:3000"
echo "Press Ctrl+C to stop the server."
