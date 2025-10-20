#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PRJ_ROOT_DIR="$(dirname "${SCRIPT_DIR}")"

DOT_ENV_FILE="${PRJ_ROOT_DIR}/.env"
if [[ -f "$DOT_ENV_FILE" ]]; then
  source "$DOT_ENV_FILE"
fi

if [[ -z "$OPENAPI_SPEC_URL" ]]; then
  OPENAPI_SPEC_URL="http://api.cubicraft.zoe.sensetime.com/api/v1/openapi.json"
fi
if [[ -z "$OUTPUT_FILE" ]]; then
  OUTPUT_FILE="$SCRIPT_DIR/openapi.json"
fi

echo -e "OPENAPI_SPEC_URL: $OPENAPI_SPEC_URL"
echo -e "OUTPUT_FILE: $OUTPUT_FILE"

curl -o "$OUTPUT_FILE" $OPENAPI_SPEC_URL

if [[ $? -ne 0 ]]; then
  echo "Error: Failed to download OpenAPI spec"
  exit 1
fi
