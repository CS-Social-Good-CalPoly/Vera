#!/bin/bash

# Convert Render link to localhost in backend
# find "../backend" -type f -name "*.js" ! -path "../backend/node_modules/*" -exec perl -i -pe 's|https://vera-backend.onrender.com|http://localhost:3000|g' {} +

# Convert Render link to localhost in frontend
perl -i -0777 -pe 's|const URL_PATH = '\''https://vera-backend.onrender.com'\''|const URL_PATH = PROTOCOL + '\''://'\'' + HOSTNAME + '\''\:'\'' + PORT|s' "../frontend/src/links.js"

echo "Finished converting render URLs to localhost URLs. You're welcome."
