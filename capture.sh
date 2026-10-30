#!/usr/bin/env bash
# Usage: ./capture.sh <output-file>
# Starts the service, runs the Postman collection, saves the full CLI output.
PORT="${PORT:-3000}"
PORT=$PORT node src/server.js >/dev/null 2>&1 &
SRV=$!
sleep 1
postman collection run postman/collections/orders -e postman/environments/ci.yaml \
  --env-var baseUrl="http://localhost:$PORT" > "$1" 2>&1
echo "exit code: $?" >> "$1"
kill $SRV
