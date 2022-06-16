import VueRouter from 'vue-router';

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/main',
        },
        {
            path: '/main',
            component: () => import('houtai/components/main/index.vue'),
        },
        {
            path: '/contactus',
            component: () => import('houtai/components/main/contact_us.vue'),
        },

        {
            path: '/registration',
            component: () => import('houtai/components/domainName/registration.vue'),
        },
        {
            path: '/registration/info',
            component: () => import('houtai/components/domainName/registration_info.vue'),
        },
        {
            path: '/registration/step',
            component: () => import('houtai/components/domainName/registration_step.vue'),
        },
        {
            path: '/registration/request',
            component: () => import('houtai/components/domainName/registration_request.vue'),
        },
        {
            path: "/my/enslist",
            component: () => import('houtai/components/domainName/ens_list.vue'),
        }
    ],
});
