import { Box, Text, View, Flex, Image, Heading, VStack, Input, ScrollView, Divider, Center, Spacer, Button, Pressable, Alert, Radio   } from 'native-base';
import React, { useContext, useState, useEffect  } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import HttpContext from '../../Context/HttpContext'
import axios from 'axios';


const CheckoutScreen = ({navigation, route}) => {
    const {isLoading} = useContext(AuthContext);
    const [order, setOrder] = useState({});
    const [errors, setErrors] = useState({});
    const [bracode, setBracode] = useState(null);
    const [orderitem, setOrderItem] = useState({});
    const [checkout, setCheckout] = useState({});
    const [momoQr, setMomoQr] = useState('');
    const [value, setValue] = React.useState("0");

    const fetchData = async () => {
        await HttpContext.get('/checkout/' + route.params.id).then(res =>{
            setCheckout(res.data)
            setMomoQr('https://momosv3.apimienphi.com/api/QRCode?phone=0382200122&amount=' + res.data.amount + '&note=' + res.data.id)
            console.log(res.data)
            console.log('2')
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    function updateCheckout() {
        HttpContext.put('/checkout/update/' + route.params.id, {
            payment_type: 0,
            status: 0
        }).then(res =>{
            setCheckout(res.data)
            navigation.navigate('Home')
            alert(`Thanh toán thành công`);
        }).catch(e => {
            setErrors(e.response.data)
            console.log(e.response.data)
        })
    }

    const checkPayment = async (checkout) => {
        await axios.post(`https://momosv3.apimienphi.com/api/checkTranContent`, {
            access_token: "P1rBYzg2r31YZtDx5eSkKw4Mr4cfKZA8fq0wSZl6GPdFueZfjP",
            phone: "0382200122",
            content: route.params.id
        })
        .then(res => {
            if (res.data.error === 0) {
                if (res.data.data.amount == checkout.amount) {
                    HttpContext.put('/checkout/update/' + route.params.id, {
                        payment_type: 1,
                        status: 0
                    }).then(response =>{
                        HttpContext.put('/payment/update/' + checkout.payment, {
                            amount: res.data.data.amount,
                            partnerName: res.data.data.partnerName,
                            comment: res.data.data.comment,
                            partnerId: res.data.data.partnerId,
                            phoneUser: res.data.data.user,
                            status: 0
                        })
                        navigation.navigate('Home')
                        alert(`Thanh toán thành công`);
                    }).catch(e => {
                        setErrors(e.response.data)
                        console.log(e.response.data)
                    })
                }
                else {
                    console.log("thanh toan that bai")
                    HttpContext.put('/payment/update/' + checkout.payment, {
                        amount: res.data.data.amount,
                            partnerName: res.data.data.partnerName,
                            comment: res.data.data.comment,
                            partnerId: res.data.data.partnerId,
                            phoneUser: res.data.data.user,
                            status: 1
                    })
                    navigation.navigate('Home')
                    alert(`Thanh toán thất bại, số tiền khác số tiền phải trả`);
                    
                }
            }
            else {
                console.log('dang xu ly')
                console.log(checkout)
            }
            console.log(res.data)
        })
        .catch(error => console.log(error));
    }
    
	useEffect(() => {
        fetchData();

        const interval = setInterval(() => checkPayment(checkout), 3000);

        return () => {
            clearInterval(interval);
          };

      }, [value]);

	return (
		<Box flex="1" safeAreaTop>
			<Spiner visible={isLoading} />
            <ScrollView>
                <VStack>
                    <Flex direction="column" mb="2.5" mt="1.5" py="5">
                        <Text fontSize="xl" color="primary.700">Tổng tiền thanh toán: {checkout.amount}</Text>
                        <Text fontSize="xl" color="primary.700">Phương thức thanh toán:</Text>
                        <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                            setValue(nextValue);
                        }}>
                            <Radio value="0" my={1}>
                                Tiền mặt
                            </Radio>
                            <Radio value="1" my={1}>
                                Momo
                            </Radio>
                        </Radio.Group>
                        { checkout.status != 0 && value == 1 &&
                            <Image size={80} borderRadius={10} source={{
                                uri: momoQr
                                }} alt="Qr momo" />
                        }

                        { checkout.status == 0 &&
                            <Text fontSize="xl" color="primary.700" >Trạng thái: Đã thanh toán </Text>
                        }
                        { checkout.status != 0 &&
                            <Text fontSize="xl" color="danger.700" >Trạng thai: Chưa thanh toán </Text>
                        }
                    </Flex>
                </VStack>
            </ScrollView>
            { checkout.status != 0 && value == 0 &&
                <VStack >
                    <Center h={50}>
                        <Button h="100%" w="100%" onPress={() => updateCheckout()} >THANH TOÁN</Button>
                    </Center> 
                </VStack>
            }
		</Box>
	)
}

export default CheckoutScreen