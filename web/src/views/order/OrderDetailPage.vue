<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Chi tiết hóa đơn"
        sub-title="" />
        <a-layout-content style="padding: 0 50px">
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 500 }">
				<template #bodyCell="{ column, record }">
					<template v-if="column.dataIndex === 'image'">
						<a-image
							:width="50"
							:src="record.image"
						/>
					</template>
				</template>
            </a-table>
			<a-divider orientation="right">Tổng cộng: {{this.order.amount}}</a-divider>
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
			order: [],
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
                title: 'Hình ảnh',
                dataIndex: 'image',
                key: 'image'
				},
				{
				title: 'Tên sản phẩm',
				dataIndex: 'name',
				key: 'name'
				},
				{
				title: 'Giá',
				dataIndex: 'price',
				key: 'price'
				},
                {
				title: 'Số lượng',
				dataIndex: 'quantity',
				key: 'quantity'
				}
			];
			this.getOrder()
		},
		getOrder: function() {
			this.data = []
			BaseRequest.get('order/'+ this.$route.params.order_id)
			.then(response => {
				this.order = response.data
				for (const num in this.order.items) {
					this.data.push({
					    name: this.order.items[num].product.name,
                        image: this.order.items[num].product.image,
                        price: this.order.items[num].product.price,
                        quantity: this.order.items[num].quantity,
					})
				}
			})
			.catch(error=> {
				this.errors = error.response.data
			});
		}
	}
})
</script>