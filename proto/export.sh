# !bin/sh

buf generate
buf export . --output ../user-api/src/proto
buf export . --output ../auth-api/src/proto
buf export . --output ../inventory-api/src/proto