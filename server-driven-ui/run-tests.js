#!/usr/bin/env node
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const testCmd = "npx playwright test tests/roundtrip.spec.ts --reporter=json";
const outputFile = path.join(__dirname, "test-results.json");

exec(testCmd, (error, stdout, stderr) => {
  const result = {
    error: error ? error.message : null,
    code: error?.code ?? 0,
    stdout: stdout,
    stderr: stderr,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log("Test results written to:", outputFile);
  console.log(JSON.stringify(result, null, 2));
});
