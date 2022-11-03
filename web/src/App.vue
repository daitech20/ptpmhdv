<template>
	<div>
        <a-layout v-if="isLoggedIn" style="min-height: 100vh">
            <SideBar :user="user" />
            <a-layout>
                <Header/>
                <a-layout-content class="content">
                    <router-view v-slot="{ Component }">
                        <!-- <transition> -->
                            <component :is="Component" />
                        <!-- </transition> -->
                    </router-view>
                </a-layout-content>
                <Footer/>
            </a-layout>
        </a-layout>

        <div v-if="!isLoggedIn">
            <router-view v-slot="{ Component }">
                <!-- <transition> -->
                    <component :is="Component" />
                <!-- </transition> -->
            </router-view>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { authStore } from './store/auth.store'
import { mapState } from 'pinia'

export default {
    data() {
        return {
        }
    },
    components: {
        SideBar, Header, Footer
    },
    computed: {
        ...mapState(authStore, ['isLoggedIn', 'user'])
    }
    
}

</script>


<style scoped>
.content {
    margin: 0 16px;
}
</style>
