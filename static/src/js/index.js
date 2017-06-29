require('../scss/index.scss');

// const Vue = require('vue'),
//     app = require('app');

import Vue from 'vue'
import VueRouter from 'vue-router'
import app from 'app'
import store from './store'
import pageIndex from 'p-index'
import pageLeaves from 'p-leaves'
import pageAbout from 'p-about'

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'index',
        component: pageIndex
    }, {
        path: '/leaves',
        name: 'leaves',
        component: pageLeaves
    }, {
        path: '/about',
        name: 'about',
        component: pageAbout
    }]
});

Vue.use(VueRouter)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(app)
});
