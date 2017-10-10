/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */

module.exports = {
    "ui": false, // { "port": 8181, "weinre": { "port": 8080 } },
    "files": ['./'],
    "watchOptions": {
      ignoreInitial: true
    },
    "port": 8080,
    "proxy":  'localhost:9292'
};
