<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Tài khoản"
        sub-title="This is a subtitle of account change password page" />
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
                    label="New password 1"
                    name="new_password1"
                    :rules="[{ required: true, message: 'Please input new password 1!' }]"
                    :validateStatus="errors.new_password     ? 'error': ''"
                >
                    <a-input-password v-model:value="user_input.new_password1" />
                    <a-typography-text v-if="errors.new_password" type="danger">
                        {{errors.new_password[0]}}
                    </a-typography-text>
                </a-form-item>

                <a-form-item
                    label="New password 2"
                    name="new_password2"
                    :rules="[{ required: true, message: 'Please input new password 2!' }]"
                    :validateStatus="errors.new_password     ? 'error': ''"
                >
                    <a-input-password v-model:value="user_input.new_password2" />
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
export default({
    data() {
        return {
            user_input: {
                username: this.$route.params.username,
                password: '',
                new_password1: '',
                new_password2: ''
            },
            errors: {}
        }
    },
    methods: {
        onFinish: function() {
            BaseRequest.put('user/change/password/' + this.$route.params.username, this.user_input)
            .then(response => {
                    this.errors = {}
                    this.$router.push({ name: 'account.detail'});
                    this.updateSuccessNotification()
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