// run-update.js
import { execSync } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

// JSON formatting function
const jsonFormat = (jsonString) => {
  try {
    // Parse the JSON string to validate it
    const parsed = JSON.parse(jsonString);
    // Return formatted JSON with 2-space indentation
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    console.error('[run-update.js] Error formatting JSON:', error.message);
    // Return original content if JSON is invalid
    return jsonString;
  }
};

// get `OUTPUT_FILE` from env
let outputFile = process.env.OUTPUT_FILE;
if (outputFile) {
  // to absolute path
  outputFile = path.resolve(outputFile);
  // Set the environment variable OUTPUT_FILE to the absolute path
  process.env.OUTPUT_FILE = outputFile;
}
console.log('[run-update.js] process.env.OUTPUT_FILE:', process.env.OUTPUT_FILE);

if (os.platform() === 'win32') {
  execSync('powershell -File codegen/update.ps1');
} else {
  execSync('bash codegen/update.sh');
}

// Format the outputFile with json-format
if (outputFile && fs.existsSync(outputFile)) {
  try {
    const outputFileContent = fs.readFileSync(outputFile, 'utf-8');
    const formattedOutputFileContent = jsonFormat(outputFileContent);
    fs.writeFileSync(outputFile, formattedOutputFileContent);
    console.log('[run-update.js] JSON file formatted successfully:', outputFile);
  } catch (error) {
    console.error('[run-update.js] Error processing output file:', error.message);
  }
} else {
  console.log('[run-update.js] No output file specified or file does not exist');
}
