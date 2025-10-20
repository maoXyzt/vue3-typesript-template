# Get the directory of the current script
$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$PRJ_ROOT_DIR = Split-Path -Parent $SCRIPT_DIR

# Try to load .env file if it exists
$DOT_ENV_FILE = Join-Path $PRJ_ROOT_DIR ".env"
if (Test-Path $DOT_ENV_FILE) {
    Get-Content $DOT_ENV_FILE | ForEach-Object {
        if ($_ -match '^([^=]+)=(.*)$') {
            $name = $matches[1]
            $value = $matches[2]
            Set-Item -Path "env:$name" -Value $value
        }
    }
}

# Set default values if environment variables are not set
if (-not $env:OPENAPI_SPEC_URL) {
    $env:OPENAPI_SPEC_URL = "http://api.cubicraft.zoe.sensetime.com/api/v1/openapi.json"
}
if (-not $env:OUTPUT_FILE) {
    $env:OUTPUT_FILE = Join-Path $SCRIPT_DIR "openapi.json"
}

Write-Host "OPENAPI_SPEC_URL: $env:OPENAPI_SPEC_URL"
Write-Host "OUTPUT_FILE: $env:OUTPUT_FILE"

try {
    Invoke-WebRequest -Uri $env:OPENAPI_SPEC_URL -OutFile $env:OUTPUT_FILE
} catch {
    Write-Error "Error: Failed to download OpenAPI spec"
    exit 1
}
