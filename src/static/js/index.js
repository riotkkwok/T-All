require('../scss/index.scss');

// const Vue = require('vue'),
//     app = require('app');

import Vue from 'vue'
import app from 'app'
import store from './store'

new Vue({
    el: '#app',
    store,
    render: h => h(app)
});
