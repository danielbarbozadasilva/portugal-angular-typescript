#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

glob('src/**/*.{ts,html,scss}', { ignore: ['**/node_modules/**'] }, (err, files) => {
  if (err) {
    console.error('Error finding files:', err);
    process.exit(1);
  }
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(/from ['"]app\//g, "from '@app/").replace(/@import ['"]tailwindcss['"];/g, '');
    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Updated imports in ${file}`);
    }
  });
});
