import { Box, Text, View, Flex, Image, Heading, VStack, Input, ScrollView, Divider, Center, Spacer, Button, Pressable  } from 'native-base';
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HttpContext from '../../Context/HttpContext'


const OrderScreen = ({navigation }) => {
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

    function createOrder() {
        HttpContext.post('/order/create').then(res =>{
            fetchData()
            console.log(res.data)
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
                    <Flex direction="row" mb="2.5" mt="1.5" alignItems>
                        <Center>
                                <Button bg="primary.500" onPress={() => createOrder()} >Tạo hóa đơn</Button>
                        </Center>
                    </Flex>
                </VStack>
                <Divider />
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" py="5">
                        {orders?.length && orders.map((order) => (
                            order.status != 0 &&
                            <Flex key={order.id}>
                                <Pressable onPress={() => navigation.navigate('OrderDetail', { id: order.id, onSelect: onSelect}) } overflow="hidden" borderWidth="1" borderColor="coolGray.300"  shadow="3" bg="coolGray.100" >
                                    <Box bg="muted.200"
                                        p="5" _text={{
                                            fontSize: 'md',
                                            fontWeight: 'medium',
                                            color: 'warmGray.50',
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

export default OrderScreen