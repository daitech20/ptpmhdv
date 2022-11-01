import { Box, Flex, Text, View, Image, Heading, VStack, Input, Button, ScrollView, Divider, Center, Spacer  } from 'native-base';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const HomeScreen = ({navigation, route}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext)

    return (
        <Box flex="1" safeAreaTop>
            <Spiner visible={isLoading} />
            <ScrollView>
                <VStack space={4} w="100%" px="5" py="5">
                    <Heading size="md"  >Hello {userInfo.user.username}</Heading>
                </VStack>
                <Divider />
                <VStack space={4} w="100%" >
                    <Flex direction="row" mb="2.5" mt="1.5" justifyContent="space-around">
                        <Center w="150" h="150">
                                <Button size="100%" bg="primary.500" onPress={() => navigation.navigate('Product')} >Danh sách sản phẩm</Button>
                        </Center>

                        <Center w="150" h="150">
                            <Button size="100%" bg="secondary.500" onPress={() => navigation.navigate('Order')} >Bán Hàng</Button>
                        </Center>
                        
                    </Flex>

                    <Flex direction="row" mb="2.5" mt="1.5" justifyContent="space-around">
                        <Center w="150" h="150">
                                <Button size="100%" bg="tertiary.400" onPress={() => navigation.navigate('OrderList')} >Xem hóa đơn</Button>
                        </Center>

                        <Center w="150" h="150">
                            <Button size="100%" bg="warning.400" onPress={() => navigation.navigate('PaymentList')} >Lịch sử giao dịch</Button>
                        </Center>
                        
                    </Flex>

                </VStack>
            </ScrollView>
            <VStack>
                <Center h={50}> 
                    <Button w="100%" h="100%" onPress={logout}>Logout</Button>
                </Center>
            </VStack>
            
        </Box>
    )
}

export default HomeScreen