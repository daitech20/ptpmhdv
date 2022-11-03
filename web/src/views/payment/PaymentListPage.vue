<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Giao dịch"
        sub-title="Lịch sử giao dịch " />
        <a-layout-content style="padding: 0 50px">
            <a-table class="ant-table-striped" :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 500 }" :row-class-name="(_record, index) => (_record.status === 1 ? 'table-striped' : null)">
                <template #bodyCell="{ column, record }">
					<template v-if="column.dataIndex === 'status'">
						<span v-if="record.status === 1" style="color:red">Fail</span>
                  		<span v-if="record.status === 0" style="color:greenyellow">Success</span>
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
			payments: [],
			errors: {},
			data: [],
			visible: false
		}
	},
	mounted() {
		this.getData()
	},
	watch: {
		value: function() {
		this.getProducts()
		}
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
				title: 'Người gửi',
				dataIndex: 'partnerName',
				key: 'partnerName'
				},
				{
				title: 'Sdt người gửi',
				dataIndex: 'partnerId',
				key: 'partnerId'
				},
				{
				title: 'Sdt người nhận',
				dataIndex: 'phoneUser',
				key: 'phoneUser'
				},
				{
				title: 'Nội dung',
				dataIndex: 'comment',
				key: 'comment'
				},
				{
				title: 'Created',
				dataIndex: 'created',
				key: 'created'
				},
				{
				title: 'Status',
				dataIndex: 'status',
				key: 'status'
				}
			];
			this.getPayments()
		},
		getPayments: function() {
			this.data = []
			BaseRequest.get('payments')
			.then(response => {
				this.payments = response.data
				for (const num in this.payments) {
					if (this.payments[num].status != 2) {
						this.data.push({
							name: this.payments[num].name,
							amount: this.payments[num].amount,
							partnerName: this.payments[num].partnerName,
							partnerId: this.payments[num].partnerId,
							phoneUser: this.payments[num].phoneUser,
							comment: this.payments[num].comment,
							status: this.payments[num].status,
							created: this.payments[num].created,
							id: this.payments[num].id,
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