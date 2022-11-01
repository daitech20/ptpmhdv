import React, { useContext } from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import OrderScreen from "../Screens/Order/OrderScreen";
import OrderDetailScreen from "../Screens/Order/OrderDetailScreen";
import OrderListScreen from "../Screens/Order/OrderList";
import ProductScreen from "../Screens/Product/ProductScreen";
import ProductDetail from "../Screens/Product/ProductDetail";
import CreateProductScreen from "../Screens/Product/CreateProductScreen";
import { AuthContext } from '../Context/AuthContext';
import CameraScreen from "../Screens/Camera/CameraScreen";
import CheckoutScreen from "../Screens/Checkout/CheckoutScreen";
import PaymentListScreen from "../Screens/Payment/PaymentList";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo} = useContext(AuthContext);

    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <StatusBar hidden={true} />
                <Stack.Navigator
 
                >
                    {userInfo.access ? (
                        <>
                        <Stack.Screen name="Home" component={HomeScreen} 
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name="Order" component={OrderScreen} 
                            options={{
                                headerShown: true,
                                title: 'Hóa đơn'
                            }}
                        />
                        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} 
                            options={{
                                headerShown: true,
                                title: 'Chi tiết hóa đơn'
                            }}
                        />
                        <Stack.Screen name="OrderList" component={OrderListScreen} 
                            options={{
                                headerShown: true,
                                title: 'Danh sách đơn hàng'
                            }}
                        />
                        <Stack.Screen name="Checkout" component={CheckoutScreen} 
                            options={{
                                headerShown: true,
                                title: 'Thanh toán'
                            }}
                        />
                        <Stack.Screen name="PaymentList" component={PaymentListScreen} 
                            options={{
                                headerShown: true,
                                title: 'Lịch sử giao dịch'
                            }}
                        />
                        <Stack.Screen name="Product" component={ProductScreen} 
                            options={{
                                headerShown: true,
                                title: 'Sản phẩm'
                            }}
                        />
                        <Stack.Screen name="ProductDetail" component={ProductDetail} 
                            options={{
                                headerShown: true,
                                title: 'Chi tiết sản phẩm'
                            }}
                        />
                        <Stack.Screen name="Camera" component={CameraScreen} 
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen name="AddProduct" component={CreateProductScreen} 
                            options={{
                                headerShown: true,
                                title: 'Thêm sản phẩm'
                            }}
                        />
                        </>
                    ) : (
                        <>
                        <Stack.Screen name="Login" component={LoginScreen} 
                            options={{
                                headerShown: false
                            }}
                        />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    )
};

export default Navigation;