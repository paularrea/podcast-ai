#!/bin/bash

echo "=== Node Version ==="
node -v

echo "=== npm Version ==="
npm -v

echo "=== OS ==="
uname -a

echo "=== Expo Doctor ==="
npx expo doctor

echo "=== Expo CLI version ==="
npx expo --version

echo "=== Installed Packages ==="
npm list --depth=1

echo "=== babel.config.js ==="
cat babel.config.js

echo "=== tailwind.config.js ==="
cat tailwind.config.js

echo "=== tsconfig.json ==="
cat tsconfig.json

echo "=== Routes ==="
find ./app -name '*.tsx'