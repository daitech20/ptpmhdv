<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Sản phẩm"
        sub-title="Danh mục sản phẩm" />
        <a-layout-content style="padding: 0 50px">
            <router-link :to="{ name: 'product.create' }" >
                <a-button class="editable-add-btn" style="margin-bottom: 8px">Add</a-button>
            </router-link>
            <a-table :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 500 }">
                <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'name'">
                    <router-link :to="{ name: 'product.detail', params: { product_id: record.id }}" >
                        <a-button type="primary" size="small"> {{ record.name }}</a-button>
                    </router-link>   
                </template>
                <template v-if="column.dataIndex === 'image'">
                    <a-image
                        :width="50"
                        :src="record.image"
                    />
                </template>
                <template v-if="column.dataIndex === 'bracode'">
                    <a-image
                        :width="50"
                        :src="record.barcode"
                    />
                </template>
                <template v-if="column.dataIndex === 'option'">
                    <a-button type="primary" danger size="small" @click="showModalDelete(record.id, record.name)">Delete</a-button>
                </template>
                </template>
            </a-table>
        </a-layout-content>
        <a-modal v-model:visible="visible" title="Delete" @ok="handleDelete()">
          <p>
            Do you want to delete {{ this.product_name_del }}?
          </p>
        </a-modal>
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
			products: [],
			errors: {},
			data: [],
			visible: false,
            product_name_del: null,
            product_id_del: null
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
				title: 'Mô tả',
				dataIndex: 'description',
				key: 'description'
				},
				{
				title: 'Mã qr',
				dataIndex: 'bracode',
				key: 'bracode'
				},
				{
				title: 'Giá',
				dataIndex: 'price',
				key: 'price'
				},
                {
				title: 'Lựa chọn',
				dataIndex: 'option',
				key: 'option'
				},
			];
			this.getProducts()
		},
		getProducts: function() {
			this.data = []
			BaseRequest.get('products')
			.then(response => {
				this.products = response.data
				for (const num in this.products) {
					this.data.push({
					    name: this.products[num].name,
						description: this.products[num].description,
                        image: this.products[num].image,
                        price: this.products[num].price,
                        barcode: this.products[num].barcode,
                        id: this.products[num].id,
					})
				}
			})
			.catch(error=> {
				this.errors = error.response.data
			});
		},
        showModalDelete: function(id, name) {
			this.product_id_del = id
			this.product_name_del = name
			this.visible = true
		},
        handleDelete: function() {
			this.visible = false
			BaseRequest.delete('product/update/' + this.product_id_del)
				.then(response => {
					this.errors = {}
					this.delSuccessNotification()
                    for (let key=0; key<this.data.length; key++) {
						if (this.data[key].id === this.product_id_del) {
                            this.data.splice(key, 1)
                            break
						}
					}
					this.$router.push({ name: 'product.list'});
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
				'Store was deleted! ',
			});
		}
	}
})
</script>