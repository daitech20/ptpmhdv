<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Tài khoản"
        sub-title="Danh sách tài khoản" />
        <a-layout-content style="padding: 0 50px">
            <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">Add</a-button>
            <a-cascader v-model:value="value" :options="options" placeholder="Please select" :allowClear="false" />
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 500 }" >
                <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'username'">
                    <a>{{ record.username }}</a>
                </template>

                <template v-if="column.key === 'action'">
                    <span>
                        <router-link :to="{ name: 'account.detail', params: { username: record.username }}" >
                            <a-button type="primary" size="small">Edit</a-button>
                        </router-link>
                    </span>
                    <span>
                        <a-button type="primary" danger size="small" @click="showModalDelete(record.id, record.username)">Delete</a-button>
                    </span>
                </template>

                </template>
            </a-table>
            <a-modal v-model:visible="visibleDelete" title="Delete" @ok="handleDelete()">
            <p>
                Do you want to delete {{ name_user_del }}?
            </p>
            </a-modal>
        </a-layout-content>
    </a-layout>
</template>

<script>
import { notification } from 'ant-design-vue';
import BaseRequest from '../../core/BaseRequest.js'
export default {
    data() {
        return {
            options: [{'value': 0, 'label': 'admin'}, {'value': 1, 'label': 'store'}],
			value: [0],
            errors: {},
            data: [],
            columns: [],
            visibleDelete: false,
            name_user_del: '',
            user: {
                username: '',
                is_superuser: false,
                first_name: '',
                last_name: '',
                email: ''
            },
        }
    },
    mounted() {
        this.getData()
    },
    watch: {
		value: function() {
		    this.getAccount()
		}
	},
    methods: { 
        getData: function() {
            this.columns = [
                {
                    title: 'Id',
                    dataIndex: 'id',
                    key: 'id',
                    width: '5%',
                },
                {
                    title: 'User name',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: 'First name',
                    dataIndex: 'first_name',
                    key: 'first_name',
                },
                {
                    title: 'Last name',
                    dataIndex: 'last_name',
                    key: 'last_name',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    ellipsis: true,
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                },
            ];
            BaseRequest.get('users')
            .then(response => {
                this.user = response.data;
                this.data = []
                for (let num in this.user) {
                    if (this.value[0] === 0 && this.user[num].is_superuser) {
                        this.data.push({
                            id: this.user[num].id,
                            username: this.user[num].username,
                            first_name: this.user[num].first_name,
                            last_name: this.user[num].last_name,
                            email: this.user[num].email,
                        })
                    }
                    if (this.value[0] === 1 && this.user[num].is_superuser == false) {
                        this.data.push({
                            id: this.user[num].id,
                            username: this.user[num].username,
                            first_name: this.user[num].first_name,
                            last_name: this.user[num].last_name,
                            email: this.user[num].email,
                        })
                    }
                }
            })
            .catch(error=> {
                this.errors = error.response.data
            });
        },
        getAccount: function() {
            this.data = []
            BaseRequest.get('users')
            .then(response => {
                this.user = response.data;
                this.data = []
                for (let num in this.user) {
                    if (this.value[0] === 0 && this.user[num].is_superuser) {
                        this.data.push({
                            id: this.user[num].id,
                            username: this.user[num].username,
                            first_name: this.user[num].first_name,
                            last_name: this.user[num].last_name,
                            email: this.user[num].email,
                        })
                    }
                    if (this.value[0] === 1 && this.user[num].is_superuser == false) {
                        this.data.push({
                            id: this.user[num].id,
                            username: this.user[num].username,
                            first_name: this.user[num].first_name,
                            last_name: this.user[num].last_name,
                            email: this.user[num].email,
                        })
                    }
                }
            })
            .catch(error=> {
                this.errors = error.response.data
            });
        },
        handleAdd: function() {
            this.$router.push({ name: 'account.create'});
        },
        showModalDelete: function(id, name) {
            this.name_user_del = name
            this.visibleDelete = true
        },
        handleDelete: function() {
            this.visibleDelete = false
            BaseRequest.delete('user/' + this.name_user_del)
            .then(response => {
                this.errors = {}
                this.getAccount()
                this.delSuccessNotification()
                this.$router.push({ name: 'account.list'});
            })
            .catch(error=> {
                this.errors = error.response.data
                console.log(this.errors)
            });
        },
        delSuccessNotification: function() {
            notification['success']({
                message: 'Delete successfully!',
                description:
                'Account was deleted! ',
            });
        }
    }
}
</script>

<style scoped>
</style>