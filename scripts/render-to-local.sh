#!/bin/bash

# Convert Render link to localhost in backend
find "../backend" -type f -name "*.js" ! -path "../backend/node_modules/*" -exec perl -i -pe 's|https://vera-backend.onrender.com|http://localhost:3000|g' {} +

# Convert Render link in frontend
find "../frontend" -type f -name "*.js" ! -path "../frontend/node_modules/*" -exec perl -i -pe 's|https://vera-backend.onrender.com|http://localhost:3001|g' {} +

echo "Finished converting render URLs to localhost URLs. You're welcome."
