#!/usr/bin/env bash
# Helper script to add Vercel environment variables for this project.
# Usage: ./scripts/vercel-env-setup.sh <production-backend-url>
# Example: ./scripts/vercel-env-setup.sh https://api.example.com

if [ -z "$1" ]; then
  echo "Usage: $0 <production-backend-url>"
  exit 1
fi

PROD_URL="$1"

# Add environment variable for production
vercel env add VITE_API_URL production <<EOF
$PROD_URL
EOF

# Optionally set preview and development values (uncomment to use)
# vercel env add VITE_API_URL preview <<EOF
# $PROD_URL
# EOF

# For local development, copy .env.example
cp .env.example .env.local || true

echo "Done. Redeploy your Vercel project or run 'vercel --prod' to apply."