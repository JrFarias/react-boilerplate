const jest = require('jest');

process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

const argv = process.argv.slice(2);

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch');
}

jest.run(argv);
