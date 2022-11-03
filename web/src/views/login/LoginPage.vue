<template>
    <div class="login-container">
        <a-layout-content style="padding: 0 50px">
                    
            <form class="login-form" @submit.prevent="login()">
                <div class="title-container">
                    <h3 class="title-page">Login</h3>
                </div>
                <div v-if="errors.username" class="invalid-feedback">{{ errors.username[0] }}</div>
                <div class="form-item">
                    <div class="form-item__content">
                        <span class="icon-container">
                            <user-outlined/>
                        </span>
                        <div class="input-transform-lowercase">
                            <input placeholder="Store" type="text" class="input__inner" v-model="credentials.username" name="username" required>
                        </div>
                    </div>
                </div>
                <div v-if="errors.password" class="invalid-feedback">{{ errors.password[0] }}</div>
                <div class="form-item">
                    <div class="form-item__content">
                        <span class="icon-container">
                            <unlock-outlined/>
                        </span>
                        <div class="input-transform-lowercase">
                            <input placeholder="Password" type="password" class="input__inner" v-model="credentials.password" name="password" required>
                        </div>
                    </div>
                </div>
                <button class="btn-login">
                    Login
                </button>
                <div class="tips">
                    <a href="">Forgot password</a>
                </div>
            </form>
        </a-layout-content>
    </div>
</template>

<script>
import authService from '../../services/qltaphoa/auth.service'
import { authStore } from '../../store/auth.store'
import { mapActions } from 'pinia';
import { notification } from 'ant-design-vue';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons-vue'
export default {
    data() {
        return {
            credentials: {
                username: "",
                password: ""
            },
            errors: {}
        }
    },
    methods: {
        ...mapActions(authStore, ['setAccessToken', 'setUser', 'setRefreshToken']),
        login() {
            authService.login(this.credentials.username, this.credentials.password).then(response => {
                this.setAccessToken(response.data.access);
                this.setRefreshToken(response.data.refresh);
                this.setUser(response.data.user);
                this.$router.push({name: 'dashboard'});
            }).catch(error => {
                this.errors = error.response.data;
                this.loginErrorNotification()
            });
        },
        loginErrorNotification: function() {
            notification['error']({
                message: 'Error!',
                description: 'User Name or Password is not correct! '
            });
        }
    },
    components: {
        UserOutlined, UnlockOutlined
    }
}
</script>

<style scoped>
*{ 
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: Arial, Helvetica, sans-serif;
}
.login-container{
    min-height: 100%;
    width: 100%;
    background-color: #2e2323;
    display: flex;
    height: 100vh;
    flex-direction: column;
    color: #222;
}
.login-form{
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
}
.title-container{
    position: relative;
}
.title-container .title-page{
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
}
.form-item{
    border: 1px solid hsla(0,0%,100%,.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 22px;
}
.form-item__content{
    line-height: 40px;
    position: relative;
    font-size: 14px;
}
.icon-container{
    padding: 5px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.input-transform-lowercase{
    display: inline-block;
    height: 47px;
    width: 85%;
    position: absolute;
}
.invalid-feedback{
    color: red;
}
.input__inner{
    background: transparent;
    border: 0;
    border-radius: 0;
    color: #fff;
    height: 50px;
    font-size: 16px;
    width: 100%
}
.input__inner:focus{
    outline: none;
}
.btn-login{
    width: 100%;
    margin-bottom: 30px;
    padding: 10px 0;
    border-radius: 3px;
    border: solid 1px transparent;
}
.btn-login:hover{
    color: #ac9052;
    background-color: transparent;
    border: 1px solid #ac9052;
    cursor: pointer;
}
.tips{
    color: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
}
.tips a{
    font-size: 14px;
    color: #fff;
    text-decoration: none;
}
</style>