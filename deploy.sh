#!/bin/sh

# Display usage
usage()
{
  echo "$(basename "$0")"
}

# Install dependencies and build application
npm install
npm run build
