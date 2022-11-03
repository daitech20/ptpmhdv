<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Tạo tài khoản"
        sub-title="Tạo tài khoản" />
        <a-layout-content style="padding: 0 50px">
            <a-form
                :model="user_input"
                name="basic"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 16 }"
                @finish="onFinish"
            >
                <a-form-item
                    label="Username"
                    name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]"
                    :validateStatus="errors.username  ? 'error': ''"
                >
                    <a-input v-model:value="user_input.username" />
                    <a-typography-text v-if="errors.username" type="danger">
                        {{errors.username}}
                    </a-typography-text>
                </a-form-item>

                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]"
                    :validateStatus="errors.password ? 'error': ''"
                >
                    <a-input-password v-model:value="user_input.password" />
                    <a-typography-text v-if="errors.password" type="danger">
                        {{errors.password[0]}}
                    </a-typography-text>
                </a-form-item>

                <a-form-item
                    label="Password 2"
                    name="password2"
                    :rules="[{ required: true, message: 'Please input your password 2!' }]"
                    :validateStatus="errors.password     ? 'error': ''"
                >
                    <a-input-password v-model:value="user_input.password2" />
                </a-form-item>

                <a-form-item
                    label="Email"
                    name="email"
                    :rules="[{ required: true, message: 'Please input your Email!' }, { type: 'email' }]"
                    :validateStatus="errors.email ? 'error': ''"
                >
                    <a-input v-model:value="user_input.email" />
                    <a-typography-text v-if="errors.email" type="danger">
                        {{errors.email}}
                    </a-typography-text>
                </a-form-item>

                <a-form-item 
                    label="Type"
                    name="type"
                >
                    <a-radio-group v-model:value="user_input.is_superuser">
                        <a-radio value="0">Store</a-radio>
                        <a-radio value="1">Admin</a-radio>
                    </a-radio-group>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>

        </a-layout-content>
    </a-layout>
</template>

<script>
import BaseRequest from '../../core/BaseRequest.js'
import { notification } from 'ant-design-vue';
import { authStore } from '../../store/auth.store'
import { mapActions, mapState } from 'pinia'
export default {
    data() {
        return {
            user_input: {
                username: '',
                password: '',
                password2: '',
                email: '',
                is_superuser: '0'
            },
            errors: {}
        }
    },
    computed: {
        ...mapState(authStore, ['user'])
    },
    mounted() {
        this.checkSuperUser()
    },
    methods: {
        checkSuperUser: function() {
            if (!this.user.is_superuser ) {
                this.$router.push({name: 'dashboard'})
            }
        },
        onFinish: function() {
            BaseRequest.post('register', this.user_input)
            .then(response => {
                    console.log(response.data)
                    this.errors = {}
                    this.addSuccessNotification()
                    this.$router.push({ name: 'account.list'});
                }
            )
            .catch(error=> {
                this.errors = error.response.data
            });
        },
        addSuccessNotification: function() {
            notification['success']({
                message: 'Create successfully!',
                description:
                'User was created! ',
            });
        }
    }
}
</script>

<style scoped>
</style>