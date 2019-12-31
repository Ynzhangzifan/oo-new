import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        // 注册
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('../views/register/register')
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/login/login')
        },
        {
            path: '/password',
            name: 'password',
            component: () =>
                import ('../views/password/password')
        },
        // 主页
        {
            path: '/index',
            name: 'index',
            redirect: '/message',
            component: () =>
                import ('../views/index'),
            children: [{
                    path: '/message',
                    name: 'message',
                    component: () =>
                        import ('../views/message/message')
                },
                {
                    path: '/friend',
                    name: 'friend',
                    component: () =>
                        import ('../views/friend/friend')
                },
                {
                    path: '/group',
                    name: 'group',
                    component: () =>
                        import ('../views/group/group')

                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () =>
                        import ('../views/setting/setting')

                },
                {
                    path: '/group',
                    name: 'group',
                    component: () =>
                        import ('../views/group/group')

                },
            ]

        },
        {
            path: '/retrieve',
            name: 'retrieve',
            component: () =>
                import ('../views/password/retrieve')
        },
        {
            path: '/revision',
            name: 'revision',
            component: () =>
                import ('../views/password/revision')
        },
    ]
})