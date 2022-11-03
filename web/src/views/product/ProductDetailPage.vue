<template>
    <a-layout>
        <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="Product detail"
        sub-title="This is a subtitle of detail product page" />
        <a-layout-content style="padding: 0 50px">
            <a-form
                :model="product"
                name="nest-messages"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 16 }"
                @finish="onFinish"
            >
                <a-form-item
                    :name="['name']"
                    label="Tên sản phẩm"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]"
                    :validateStatus="errors.name ? 'error': ''"
                >
                    <a-input v-model:value="product.name" />
                    <a-typography-text v-if="errors.name" type="danger">
                        {{errors.name[0]}}
                    </a-typography-text>
                </a-form-item>
                
                <a-form-item
                    :name="['description']"
                    label="Mô tả"
                    :rules="[{ required: true, message: 'Vui lòng nhập mô tả!' }]"
                >
                    <a-input v-model:value="product.description" />
                </a-form-item>

                <a-form-item :name="['image']" label="Hình ảnh" :rules="[{ required: false }]">
                    <a-image
                        :width="200"
                        :src="product.image"
                    />
                    <a-upload
                        v-model:file-list="fileList"
                        list-type="picture"
                        :max-count="1"
                        accept=".jpg,.png"
                        >
                        <a-button>
                            <upload-outlined></upload-outlined>
                            Upload (Max: 1)
                        </a-button>
                    </a-upload>
                </a-form-item>

                <a-form-item :name="['barcode']" label="Bracode" :rules="[{ required: false }]">
                    <a-image
                        :width="200"
                        :src="product.barcode"
                    />
                </a-form-item>

                <a-form-item
                    :name="['price']"
                    label="Giá"
                    :rules="[{ required: true, message: 'Vui lòng nhập giá tiền!' }]"
                >
                    <a-input v-model:value="product.price" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit" >Cập nhật</a-button>
                </a-form-item>
            </a-form>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts">
import BaseRequest from '../../core/BaseRequest.js'
import { notification } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import type { UploadProps, UploadChangeParam } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

export default({
    data() {
        return {
            product: {
                name: '',
                description: '',
                image: '',
                price: '',
                barcode: ''
            },
            errors: {},
            fileList: [],
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        handleChange: function(info: UploadChangeParam) {
            this.product.image = this.fileList[0].thumbUrl
        },

        getData: function() {
            BaseRequest.get('product/update/' + this.$route.params.product_id)
            .then(response => {
                    this.product.name = response.data.name,
                    this.product.description = response.data.description
                    this.product.image = response.data.image
                    this.product.price = response.data.price
                    this.product.barcode = response.data.barcode
                }
            )
        },
        onFinish: function() {
            if (this.fileList[0] != null) {
                BaseRequest.put('product/update/' + this.$route.params.product_id, {
                    name: this.product.name,
                    description: this.product.description,
                    price: this.product.price,
                    image: this.fileList[0].thumbUrl
                })
                .then(response => {
                        this.errors = {}
                        this.updateSuccessNotification()
                        this.$router.push({ name: 'product.list'});
                    }
                )
                .catch(error=> {
                    this.errors = error.response.data
                    console.log(this.errors)
                });
            }
            else {
                BaseRequest.put('product/update/' + this.$route.params.product_id, {
                    name: this.product.name,
                    description: this.product.description,
                    price: this.product.price
                })
                .then(response => {
                        this.errors = {}
                        this.updateSuccessNotification()
                        this.$router.push({ name: 'product.list'});
                    }
                )
                .catch(error=> {
                    this.errors = error.response.data
                    console.log(this.errors)
                });
            }
            
        },
        updateSuccessNotification: function() {
            notification['success']({
                message: 'Update successfully!',
                description:
                'Product was updated! ',
            });
        }
    },
    components: {
        UploadOutlined
    }
})
</script>