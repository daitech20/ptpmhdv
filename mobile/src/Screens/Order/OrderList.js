import { Box, Flex, Text, View, Image, Heading, VStack, Input, Button, ScrollView, Divider, Center, Spacer, AspectRatio, Pressable  } from 'native-base';
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HttpContext from '../../Context/HttpContext'

const OrderListScreen = ({navigation}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);
    const [orders, setOrders] = useState({});
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        HttpContext.get('/orders').then(res =>{
            setOrders(res.data)
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    function onSelect() {
        fetchData()
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <Box flex="1" safeAreaTop>
            <Spiner visible={isLoading} />
            <ScrollView>
                <VStack space={4} w="100%" >
                    <Text fontSize="lg" color="primary.800">Đơn hàng đã thanh toán</Text>
                </VStack>
                <Divider />
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" px="5" py="5">
                        {orders?.length && orders.map((order) => (
                            order.status == 0 &&
                            <Flex key={order.id}>
                                <Pressable onPress={() => navigation.navigate('OrderDetail', { id: order.id, onSelect: onSelect}) } overflow="hidden" borderWidth="1" borderColor="coolGray.300"  shadow="3" bg="coolGray.100" >
                                    <Box bg="success.400"
                                        p="5" _text={{
                                            fontSize: 'md',
                                            fontWeight: 'medium',
                                            color: 'success.400',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Text>Hóa đơn {order.id}</Text>
                                    </Box>
                                </Pressable>
                            </Flex>
                        ))}
                         
                    </Flex>
                </VStack>

                <VStack space={4} w="100%" >
                    <Text fontSize="lg" color="error.700">Đơn hàng chưa thanh toán</Text>
                </VStack>
                <Divider />
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" px="5" py="5">
                        {orders?.length && orders.map((order) => (
                            order.status != 0 &&
                            <Flex key={order.id}>
                                <Pressable onPress={() => navigation.navigate('OrderDetail', { id: order.id, onSelect: onSelect}) } overflow="hidden" borderWidth="1" borderColor="coolGray.300"  shadow="3" bg="coolGray.100" >
                                    <Box bg="danger.400"
                                        p="5" _text={{
                                            fontSize: 'md',
                                            fontWeight: 'medium',
                                            color: 'success.400',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Text>Hóa đơn {order.id}</Text>
                                    </Box>
                                </Pressable>
                            </Flex>
                        ))}
                         
                    </Flex>
                </VStack>
                
            </ScrollView>
        </Box>
    )
}

export default OrderListScreen