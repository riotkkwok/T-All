require('../scss/index.scss');

const Vue = require('vue'),
    app = require('app');

new Vue({
    el: '#app',
    render: h => h(app)
});
