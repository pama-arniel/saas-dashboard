#!/usr/bin/env bash
# Quick test script to POST a registration payload to the backend.
# Usage: ./scripts/test_registration.sh <backend-base-url>
# Example: ./scripts/test_registration.sh http://localhost:5000

if [ -z "$1" ]; then
  echo "Usage: $0 <backend-base-url>"
  exit 1
fi

BASE="$1"

curl -i -X POST "$BASE/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test+auto@example.com","password":"password123"}'

# For testing the deployed frontend, visit https://saas-dashboard-ecru.vercel.app/login and try registering.
