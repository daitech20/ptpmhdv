import { Box, Flex, Text, View, Image, Heading, VStack, Input, Button, ScrollView, Divider, Center, Spacer  } from 'native-base';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Spiner from 'react-native-loading-spinner-overlay'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const CheckoutList = ({navigation, route}) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext)
    

    return (
        <Box flex="1" safeAreaTop>
            <Text>ok</Text>
        </Box>
    )
}

export default CheckoutList