<template>
    <a-layout-sider v-model="collapsed" collapsible @collapse="setSidebarCollapsed">
        <div class="logo">
        </div>
        <a-menu v-model="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="dashboard">
                <pie-chart-outlined/>
                <router-link class="menu-link" :to="{name: 'dashboard'}">Dashboard</router-link>
            </a-menu-item>
            <a-menu-item key="account" v-if="user && user.is_superuser">
                <user-outlined/>
                <router-link class="menu-link" :to="{name: 'account.list'}">Tài khoản</router-link>
            </a-menu-item>
            <a-menu-item key="product.list"  v-if="user && user.is_superuser == 0">
                <gold-outlined/>
                <router-link class="menu-link" :to="{name: 'product.list'}">Sản phẩm</router-link>
            </a-menu-item>
            <a-menu-item key="payment.list"  v-if="user && user.is_superuser == 0">
                <pay-circle-outlined/>
                <router-link class="menu-link" :to="{name: 'payment.list'}">Giao dịch</router-link>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script>
import { mapActions } from 'pinia'
import { appearance } from '../store/appearance'
import BaseRequest from '../core/BaseRequest.js'
import { PieChartOutlined, UserOutlined, MessageOutlined, GoldOutlined, PayCircleOutlined } from '@ant-design/icons-vue'
export default {
    data() {
        return {
            selectedKeys: [],
            collapsed: false,
            errors: {
            }
        }
    },
    props: ['user'],
    mounted() {
        this.collapsed = this.isSidebarCollapased()
    },
    methods: {
        ...mapActions(appearance, ['isSidebarCollapased', 'setSidebarCollapsed']),
    },
    components: {
        PieChartOutlined, UserOutlined, MessageOutlined, GoldOutlined, PayCircleOutlined
    }
}
</script>

<style scoped>
.logo {
    width: 100%;
    padding: 16px 16px;
}
.logo-image {
   width: 100%;
   background-color: #fff;
}
.ant-menu-item .anticon + .menu-link {
    margin-left: 10px;
}
.ant-menu.ant-menu-inline-collapsed > .ant-menu-item .anticon + .menu-link {
    display: inline-block;
    opacity: 0;
}
</style>