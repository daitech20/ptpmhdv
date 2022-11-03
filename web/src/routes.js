import { createRouter, createWebHistory } from "vue-router"
import { authStore } from "./store/auth.store"
import LoginPage from './views/login/LoginPage.vue'
import DashboardPage from './views/DashboardPage.vue'
import ProductListPage from './views/product/ProductListPage.vue'
import ProductDetailPage from './views/product/ProductDetailPage.vue'
import ProductCreatePage from './views/product/ProductCreatePage.vue'
import PaymentListPage from './views/payment/PaymentListPage.vue'

const routes = [
    {
        name: 'dashboard',
        path: '/dashboard',
        component: DashboardPage
    },
    {
        name: 'login',
        path: '/dashboard/login',
        component: LoginPage
    },
    {
        name: 'product.list',
        path: '/dashboard/products',
        component: ProductListPage
    },
    {
        name: 'product.detail',
        path: '/dashboard/product/:product_id',
        component: ProductDetailPage,
        params: true
    },
    {
        name: 'product.create',
        path: '/dashboard/product/create',
        component: ProductCreatePage
    },
    {
        name: 'payment.list',
        path: '/dashboard/payments',
        component: PaymentListPage
    }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes // short for `routes: routes`
})

router.beforeEach(async(to) => {
    // Always redirect to dashboard
    if (! /^\/dashboard\/(.*)/.test(to.path)) {
        return "/dashboard/"
    }

    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['login'];
    const authRequired = !publicPages.includes(to.name);
    const auth = authStore();

    if (authRequired && !auth.isLoggedIn) {
        auth.returnUrl = to.fullPath;
        return '/dashboard/login';
    }
})

export default router