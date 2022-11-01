import { Box, Button, View, Flex, Text, Heading, VStack, Input, ScrollView, Divider, Center, Spacer, FormControl  } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { Image, Platform } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as ImagePicker from 'expo-image-picker';
import HttpContext from '../../Context/HttpContext'
import * as FileSystem from 'expo-file-system';



const ProductDetail = ({navigation, route}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext)
    const [name, setName] = useState('')
    const [imageBase64, setImageBase64] = useState(null)
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [errors, setErrors] = useState({})
    const [product, setProduct] = useState({})

    const fetchData = () => {
        HttpContext.get('/product/update/' + route.params.id).then(res =>{
            setProduct(res.data)
            setName(res.data.name)
            setImage(res.data.image)
            setDescription(res.data.description)
            setPrice(res.data.price)
            console.log(res.data)
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            
            const response = await FileSystem.readAsStringAsync(result.uri, {
                encoding: FileSystem.EncodingType.Base64
            })
            setImageBase64(response);
        }
    };

    function createProduct() {
        HttpContext.post('/product/create', {
            name: name,
            description: description,
            price: price,
            image: imageBase64
        }).then(res =>{
            navigation.navigate('Home')
            alert(`Thêm sản phẩm thành công`);
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    async function updateProduct() {

        if (imageBase64 == null) {
            FileSystem.downloadAsync(
                image,
                FileSystem.documentDirectory + 'image.jpg'
            ).then(async ({ uri }) => {
                const response = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64
                })
                setImageBase64(response);
            })
            .catch(error => {
                console.error(error);
            });
        }
        
        HttpContext.put('/product/update/' + route.params.id, {
            name: name,
            description: description,
            price: price,
            image: imageBase64
        }).then(res =>{
            navigation.navigate('Home')
            alert(`Cập nhật sản phẩm thành công`);
        }).catch(e => {
            setErrors(e.response.data)
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
                <VStack space={4} w="100%" pl={5} >
                    <FormControl >
                        <VStack space={2} pt="6">
                            <Text>Tên sản phẩm: </Text>
                            <Input
                                value={name}
                                onChangeText={text => setName(text)}
                                w="90%" pl={2}
                            />               

                            <Text>Mô tả: </Text>
                            <Input
                                value={description}
                                onChangeText={text => setDescription(text)}
                                w="90%" pl={2}
                                h="20"
                            />

                            <Text>Giá: </Text>         
                            <Input
                                value={price}
                                onChangeText={text => setPrice(text)}
                                w="90%" pl={2}
                            />  
                            <Button w="30%" bg="black" onPress={pickImage}> Upload hinh </Button>
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            <Text style={{color: "red"}} >{errors.detail}</Text>
                        </VStack>
                    </FormControl>
                </VStack>
            </ScrollView>
            <VStack >
                {route.params.update && 
                    <Center h={50}>
                        <Button h="100%" w="100%" onPress={() => updateProduct()} >Cập nhật sản phẩm</Button>
                    </Center> 
                }

                {route.params.update == null && 
                    <Center h={50}>
                        <Button h="100%" w="100%" onPress={() => createProduct()} >Thêm sản phẩm</Button>
                    </Center> 
                }
                
            </VStack>
        </Box>
    )
}

export default ProductDetail