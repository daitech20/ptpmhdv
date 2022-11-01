import { Box, Text, View, Flex, Image, Heading, VStack, Input, ScrollView, Divider, Center, Spacer, Button, Pressable  } from 'native-base';
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HttpContext from '../../Context/HttpContext'
import axios from 'axios';


const OrderDetailScreen = ({navigation, route}) => {
    const {isLoading} = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const [errors, setErrors] = useState({});
    const [bracode, setBracode] = useState(null);
    const [orderitem, setOrderItem] = useState({});
    const [checkout, setCheckout] = useState({});

    const fetchData = () => {
        HttpContext.get('/order/' + route.params.id).then(res =>{
            setOrder(res.data)
            console.log(res.data)
            console.log('reset data')
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    async function checkExist(bracode) {
        console.log('bracode', bracode)
        for (const key in order.items) {
            if (bracode == order.items[key].product.id) {
                setOrderItem(order.items[key])
                console.log(order.items[key].quantity)
                return [true, order.items[key]]
            }
        }
        return false
    };

    function updateOrderItem(orderitem) {
        
        HttpContext.put('/orderitem/update/' + orderitem.id, {
            quantity: orderitem.quantity + 1,
            product: orderitem.product.id
        }).then(res => {
            console.log('update order item',res.data)
            let items_id = []
            for (const key in order.items) {
                items_id.push(order.items[key].id)
            }
            HttpContext.put('/order/update/' + order.id, {
                items: items_id
            }).then(res => {
                console.log("update order thanh cong")
                console.log(res.data)
                fetchData()
            }).catch(e => {
                console.log('loi update order')
            })
            fetchData()
        }).catch(e => {
            console.log('loi update them order item')
        })

    }

    function createOrderItem(product_id) {
        
        HttpContext.post('/orderitem/create', {
            quantity: 1,
            product: product_id
        }).then(res => {
            console.log('order item moi tao', res.data)
            let items_id = [res.data.id]
            for (const key in order.items) {
                items_id.push(order.items[key].id)
            }
            HttpContext.put('/order/update/' + order.id, {
                items: items_id
            }).then(response => {
                console.log("tao vao thanh cong")
                console.log('items', items_id)
                console.log(response.data)
                fetchData()
            }).catch(e => {
                setErrors(e.response.data)
                console.log(e.response.data)
            })
            fetchData()
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    async function onSelectCamera(data) {
        setBracode(data.bracode)
        const isExist = await checkExist(data.bracode)
        
        if (isExist[0]) {
            console.log('thyem vao')
            updateOrderItem(isExist[1])
        }   
        else {
            console.log('tao moi')
            createOrderItem(data.bracode)
        }     
    }

    function deleteOrder() {
        HttpContext.delete('/order/update/' + order.id).then(res => {
            console.log('da xoa', res.data)
            route.params.onSelect()
            navigation.goBack()
        }).catch(e => {
            console.log(e.response.data)
        })
    }

	useEffect(() => {
        fetchData();
      }, []);

	return (
		<Box flex="1" safeAreaTop>
			<Spiner visible={isLoading} />
            <ScrollView>
                {order.status != 0 &&
                    <VStack space={4} w="100%" >
                        <Flex direction="row" mb="2.5" mt="1.5" alignItems>
                            <Center>
                                    <Button bg="primary.500" onPress={() => navigation.navigate('Camera', {onSelectCamera: onSelectCamera})} >Them san pham </Button>
                            </Center>
                            <Center>
                                    <Button bg="secondary.500" onPress={() => deleteOrder()} >Xoa hoa don</Button>
                            </Center>
                        </Flex>
                    </VStack>
                }
                <Divider />
                <VStack>
                    <Text fontSize="sm" color="primary.800">Đã tạo lúc: {order.created}</Text>
                    <Flex direction="column" mb="2.5" mt="1.5" py="5">
                        {order.items?.length && order.items.map((key) => (
                            <Flex key={key.id} direction="row" py="2">
                                    <Box>
                                        <Image size={20} borderRadius={10} source={{
                                            uri: key.product.image
                                            }} alt="Alternate Text" />
                                            
                                    </Box>
                                    <Flex direction="column" px="5">
                                        <Flex>
                                            <Text>Sản phẩm: {key.product.name}</Text>
                                        </Flex>
                                        <Flex>
                                            <Text>Số lượng: {key.quantity}</Text>
                                        </Flex>
                                        <Flex>
                                            <Text>Đơn giá: {key.product.price}</Text>    
                                        </Flex>
                                    </Flex>
                            </Flex>
                        ))}
                        <Divider />
                        <Text fontSize="xl" color="primary.800" >Tổng tiền: {order.amount}</Text>
                    </Flex>
                </VStack>
            </ScrollView>
            {order.status != 0 &&
                <VStack >
                    <Center h={50}>
                        <Button h="100%" w="100%" onPress={() => navigation.navigate('Checkout', {id: order.checkout})} >Tiến hành thanh toán</Button>
                    </Center> 
                </VStack>
            }
            {order.status == 0 &&
                <VStack >
                    <Center h={50}>
                        <Button h="100%" w="100%" >Đã thanh toán</Button>
                    </Center> 
                </VStack>
            }
		</Box>
	)
}

export default OrderDetailScreen