import { Box, Flex, Text, Image, VStack, Button, ScrollView, Divider, Center, Pressable  } from 'native-base';
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HttpContext from '../../Context/HttpContext'
const ProductScreen = ({navigation}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);
    const [products, setProducts] = useState({});
    const [errors, setErrors] = useState({});


    const fetchData = () => {
        HttpContext.get('/products').then(res =>{
            setProducts(res.data)
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    const onTest = () => {
        console.log('yes')
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
                                <Button bg="primary.500" onPress={() => navigation.navigate('AddProduct')} >Thêm sản phẩm</Button>
                        </Center>
                    </Flex>
                </VStack>
                <Divider />
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" px="5" py="5">
                        {products?.length && products.map((product) => (
                            <Pressable key={product.id} onPress={() => navigation.navigate('ProductDetail', {id: product.id, update: true})}>
                            <Flex direction="row" py="2" >
                                <Box>
                                    <Image size={90} borderRadius={10} source={{
                                        uri: product.image
                                        }} alt="Alternate Text" />
                                        
                                </Box>
                                <Flex direction="column" px="5">
                                    <Flex>
                                        <Text>{product.name}</Text></Flex>
                                    <Flex>
                                        <Text>Mô tả: {product.description}</Text></Flex>
                                    <Flex>
                                        <Text>Giá: {product.price}</Text>         
                                    </Flex>
                                </Flex>
                            </Flex>
                            </Pressable>
                        ))}
                         
                    </Flex>
                </VStack>
                
            </ScrollView>
        </Box>
    )
}

export default ProductScreen