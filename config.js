const path = require('path'),
    setting = {
        deployserver: {
            root: './dist',
            path: '/static',
            revRoot: './dist/server'
        }
    },
    config = {
        isDebug: true,
        deployserver: setting.deployserver,
        path: {
            root: setting.deployserver.root,
            dest: path.join(setting.deployserver.root, setting.deployserver.path),
            rev: path.join(setting.deployserver.revRoot, 'assets/rev-manifest.json'),
            jsDest: path.join(setting.deployserver.root, setting.deployserver.path, 'js')
        }
    };

module.exports = config;