import { Box, Flex, Text, View, Image, Heading, VStack, Input, Button, ScrollView, Divider, Center, Spacer, AspectRatio, Pressable  } from 'native-base';
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HttpContext from '../../Context/HttpContext'

const PaymentListScreen = ({navigation}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);
    const [payments, setPayments] = useState({});
    const [errors, setErrors] = useState({});

    const fetchData = () => {
        HttpContext.get('/payments').then(res =>{
            setPayments(res.data)
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
                    <Text fontSize="lg" color="primary.800">Giao dịch thành công</Text>
                </VStack>
                <Divider />
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" px="5" py="5">
                        {payments?.length && payments.map((payment) => (
                            payment.status == 0 &&
                            <Flex key={payment.id}>
                                <Text>Payment {payment.id}</Text>
                                <Text>Người gửi: {payment.partnerName}</Text>
                                <Text>Sdt người gửi: {payment.partnerId}</Text>
                                <Text>Số tiền: {payment.amount}</Text>
                                <Text>Nội dung: {payment.comment}</Text>
                                <Text>Sdt người nhận: {payment.phoneUser}</Text>
                                <Divider />
                            </Flex>
                        ))}
                         
                    </Flex>
                </VStack>

                <VStack space={4} w="100%" >
                    <Text fontSize="lg" color="error.700">Giao dịch thất bại</Text>
                </VStack>
                <Divider />
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" px="5" py="5">
                        {payments?.length && payments.map((payment) => (
                            payment.status == 1 &&
                            <Flex key={payment.id}>
                                <Text>Payment {payment.id}</Text>
                                <Text>Người gửi: {payment.partnerName}</Text>
                                <Text>Sdt người gửi: {payment.partnerId}</Text>
                                <Text>Số tiền: {payment.amount}</Text>
                                <Text>Nội dung: {payment.comment}</Text>
                                <Text>Sdt người nhận: {payment.phoneUser}</Text>
                                <Divider />
                            </Flex>
                        ))}
                         
                    </Flex>
                </VStack>
                
            </ScrollView>
        </Box>
    )
}

export default PaymentListScreen