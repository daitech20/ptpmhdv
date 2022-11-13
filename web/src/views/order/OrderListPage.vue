<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Hóa đơn"
        sub-title="Danh sách hóa đơn" />
        <a-layout-content style="padding: 0 50px">
            <a-table class="ant-table-striped" :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 500 }" :row-class-name="(_record, index) => (_record.status === 1 ? 'table-striped' : null)">
                <template #bodyCell="{ column, record }">
					<template v-if="column.dataIndex === 'status'">
						<span v-if="record.status === 1" style="color:red">Thất bại</span>
                  		<span v-if="record.status === 0" style="color:greenyellow">Thành công</span>
					</template>
					<template v-if="column.dataIndex === 'id'">
						<router-link :to="{ name: 'order.detail', params: { order_id: record.id }}" >
							<a-button type="primary" size="small"> {{ record.id }}</a-button>
						</router-link>   
					</template>
                </template>
				
            </a-table>
        </a-layout-content>
    </a-layout>

</template>

<script>
import BaseRequest from '../../core/BaseRequest.js';
import { authStore } from '../../store/auth.store';
import { mapState } from 'pinia';
import { notification } from 'ant-design-vue';


export default({
	data() {
		return {
			columns: [],
			orders: [],
			errors: {},
			data: [],
			visible: false
		}
	},
	mounted() {
		this.getData()
	},
	computed: {
		...mapState(authStore, ['isLoggedIn', 'user'])
	},
	methods: {
		getData: function() {
			this.columns = [
                {
				title: 'Id',
				dataIndex: 'id',
				key: 'id'
				},
				{
				title: 'Số tiền',
				dataIndex: 'amount',
				key: 'amount'
				},
				{
				title: 'Ngày tạo',
				dataIndex: 'created',
				key: 'created'
				},
				{
				title: 'Trạng thái',
				dataIndex: 'status',
				key: 'status'
				}
			];
			this.getOrders()
		},
		getOrders: function() {
			this.data = []
			BaseRequest.get('orders')
			.then(response => {
				this.orders = response.data
				for (const num in this.orders) {
					if (this.orders[num].status != 2) {
						this.data.push({
							amount: this.orders[num].amount,
							status: this.orders[num].status,
							created: this.orders[num].created,
							id: this.orders[num].id
						})
					}
				}
			})
			.catch(error=> {
				this.errors = error.response.data
			});
		}
	}
})
</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #f3d6849c;
}
.ant-table-striped :deep(.table-striped) .ant-table-cell-row-hover {
    background-color: #f3d6849c;
}
</style>