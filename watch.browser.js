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
    "proxy": {
      target: 'localhost:9393',
    },
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    },
    "reloadOnRestart": false,
    "notify": true,
    "scrollProportionally": true,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.browse",
    "reloadDelay": 0,
    "reloadDebounce": 0,
    "reloadThrottle": 0,
    "plugins": [],
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "localOnly": true,
    "codeSync": true,
    "timestamps": true,
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    }
};
