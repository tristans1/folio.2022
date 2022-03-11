import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: () => import('../view/HomeView'),
        },
        {
            path: '/works',
            name: 'WorksView',
            component: () => import('../view/WorksView'),
        },
        {
            path: '/about',
            name: 'AboutView',
            component: () => import('../view/AboutView'),
        },
        {
            path: '/about',
            name: 'ContactView',
            component: () => import('../view/ContactView'),
        },
    ],
});
