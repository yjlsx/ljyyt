const pkg = require('../package.json');

const expectedRepo = 'https://github.com/yjlsx/ljyyt.git';
const expectedIssues = 'https://github.com/yjlsx/ljyyt/issues';
const expectedHomepage = 'https://github.com/yjlsx/ljyyt#readme';

if (!pkg.repository || pkg.repository.type !== 'git') {
  throw new Error('package.json should declare a git repository');
}

if (pkg.repository.url !== expectedRepo) {
  throw new Error('package.json repository.url should match the real GitHub remote');
}

if (!pkg.bugs || pkg.bugs.url !== expectedIssues) {
  throw new Error('package.json bugs.url should match the real GitHub issues page');
}

if (pkg.homepage !== expectedHomepage) {
  throw new Error('package.json homepage should match the real GitHub README URL');
}

for (const value of [
  pkg.repository.url,
  pkg.bugs && pkg.bugs.url,
  pkg.homepage
]) {
  if (String(value).includes('username/lijiang-yinyuetai')) {
    throw new Error('package.json still contains stale template GitHub metadata');
  }
}
