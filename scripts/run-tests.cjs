const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const testsDir = path.join(ROOT, 'tests');
const setupPath = path.join(testsDir, 'setup.cjs');
const tests = fs.readdirSync(testsDir)
  .filter((name) => name.endsWith('.cjs') && name !== 'setup.cjs' && name !== 'test-helpers.cjs')
  .sort();

let failed = 0;

for (const test of tests) {
  const relPath = path.join('tests', test);
  process.stdout.write('--- ' + relPath + ' ---\n');
  const result = spawnSync(process.execPath, [
    '-r', setupPath,
    path.join(testsDir, test)
  ], {
    cwd: ROOT,
    stdio: 'inherit'
  });
  if (result.status !== 0) failed += 1;
}

if (failed) {
  process.stderr.write(failed + ' test file(s) failed\n');
  process.exit(1);
}

process.stdout.write(tests.length + ' test file(s) passed\n');
