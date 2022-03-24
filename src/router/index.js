import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: () => import('../views/HomeView'),
        },
        {
            path: '/works',
            name: 'WorksView',
            component: () => import('../views/WorksView'),
        },
        {
            path: '/about',
            name: 'AboutView',
            component: () => import('../views/AboutView'),
        },
        {
            path: '/about',
            name: 'ContactView',
            component: () => import('../views/ContactView'),
        },
    ],
});
