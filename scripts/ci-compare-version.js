var compareVersions = require('compare-versions');
if (compareVersions.compare(process.argv[2], process.argv[3], '>')) {
    process.exit(0);
}
console.log ('The version is lower than npm registry version.')
process.exit(1);
