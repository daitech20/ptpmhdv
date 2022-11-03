<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Account"
        sub-title="This is a subtitle of account reset password page" />
        <a-layout-content style="padding: 0 50px">
            <a-form
                :model="user_input"
                name="nest-messages"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 16 }"
                @finish="onFinish"
            >
                <a-form-item :name="['username']" label="Username" :rules="[{ required: true }]" >
                    <a-input v-model:value="user_input.username" disabled/>
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

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" >Submit</a-button>
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
export default({
    data() {
        return {
            user_input: {
                username: this.$route.params.username,
                password: '',
                password2: ''
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
            BaseRequest.put('user/reset/password/' + this.$route.params.username, this.user_input)
            .then(response => {
                    this.errors = {}
                    this.updateSuccessNotification()
                    this.$router.push({ name: 'account.list'});
                }
            )
            .catch(error=> {
                this.errors = error.response.data
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