import { Login, Profile, Status, Callback, Logout } from "./pages";

const routes = [
    {
        path: '/login',
        component: Login,
        isPrivate: false,
    },
    {
        path: '/profile',
        component: Profile,
        isPrivate: true,
    },
    {
        path: '/status',
        component: Status,
        isPrivate: false,
    },
    {
        path: '/callback',
        component: Callback,
        isPrivate: false,
    },
    {
        path: '/logout',
        component: Logout,
        isPrivate: true,
    },
    {
        path: '/*',
        component: Profile,
        isPrivate: true,
    },
]

export default routes;