<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Chi tiết tài khoản"
        sub-title="This is a subtitle of detail account page" />
        <a-layout-content style="padding: 0 50px">
            <a-form
                :model="user_input"
                name="nest-messages"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 16 }"
                @finish="onFinish"
            >
                <a-form-item
                    :name="['username']"
                    label="Username"
                    :rules="[{ required: true }]"
                >
                    <a-input v-model:value="user_input.username" disabled/>
                </a-form-item>

                <a-form-item
                    :name="['first_name']"
                    label="First name"
                    :rules="[{ required: true, message: 'Please input your First name!' }]"
                >
                    <a-input v-model:value="user_input.first_name"/>
                </a-form-item>

                <a-form-item
                    :name="['last_name']"
                    label="Last name"
                    :rules="[{ required: true, message: 'Please input your Last name!' }]"
                >
                    <a-input v-model:value="user_input.last_name" />
                </a-form-item>

                <a-form-item
                    :name="['email']"
                    label="Email"
                    :rules="[{ required: true, message: 'Please input your Email!' }]"
                    :validateStatus="errors.email ? 'error': ''"
                >
                    <a-input v-model:value="user_input.email" />
                    <a-typography-text v-if="errors.email" type="danger">
                        {{errors.email}}
                    </a-typography-text>
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" >Submit</a-button>
                </a-form-item>
            </a-form>

            <router-link v-if="user !== null && user.is_superuser" :to="{ name: 'account.resetpassword', params: { username: user_input.username }}" >
                <a-typography-link>Reset password</a-typography-link>
            </router-link>

            <router-link v-if="user !== null && user.is_superuser==false" :to="{ name: 'account.changepassword', params: { username: user_input.username }}" >
                <a-typography-link>Change password</a-typography-link>
            </router-link>

        </a-layout-content>
    </a-layout>
</template>

<script>
import BaseRequest from '../../core/BaseRequest.js'
import { notification } from 'ant-design-vue';
import { authStore } from '../../store/auth.store'
import { mapActions, mapState } from 'pinia'
export default({
    data() {
        return {
            user_input: {
                username: this.$route.params.username,
                is_superuser: false,
                first_name: '',
                last_name: '',
                email: ''
            },
            errors: {}
        }
    },
    computed: {
        ...mapState(authStore, ['user'])
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData: function() {
            BaseRequest.get('user/' + this.$route.params.username)
            .then(response => {
                    this.user_input.username = response.data.username
                    this.user_input.first_name = response.data.first_name
                    this.user_input.last_name = response.data.last_name
                    this.user_input.email = response.data.email
                    this.user_input.is_superuser = response.data.is_superuser
                }
            )
            .catch(error => {
                ///
            })
            
        },
        
        onFinish: function() {
            BaseRequest.put('user/' + this.$route.params.username, this.user_input)
            .then(response => {
                    this.errors = {}
                    if (this.user.is_superuser) {
                        this.$router.push({name: 'account.list'})
                    }
                    else {
                        this.$router.push({name: 'dashboard'})
                    }
                    
                    this.updateSuccessNotification()   
                }
            )
            .catch(error=> {
                this.errors = error.response.data
                console.log(this.errors)
            });
        },
        updateSuccessNotification: function() {
            notification['success']({
                message: 'Update successfully!',
                description:
                'Account was updated! ',
            });
        }
    },
})
</script>