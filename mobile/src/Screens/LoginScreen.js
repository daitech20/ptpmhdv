import { Box, Flex, Text, View, Image, Heading, VStack, Input, Button, FormControl } from 'native-base';
import React, { useContext, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { AuthContext } from '../Context/AuthContext';
import HttpContext from '../Context/HttpContext';
import Spiner from 'react-native-loading-spinner-overlay'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {login, isLoading, errors} = useContext(AuthContext);

    return (
        <Box flex={1} bg={Colors.black}>
            <Image 
                flex={1}
                alt="Logo"
                resizeMode="cover"
                size="lg"
                w="full"
                source={require("../../assets/screen.jpg")}
            />
            <Box
                w="full"
                h="full"
                position="absolute"
                top="0"
                px="6"
                justifyContent="center"
            >
                <Heading>LOGIN</Heading>
                <Spiner visible={isLoading} />
                <FormControl >
                    <VStack space={8} pt="6">
                        <Input
                            InputLeftElement={
                                <MaterialIcons name="email" size={20} color="black" />
                            }
                            value={email}
                            onChangeText={text => setEmail(text)}
                            variant="underlined" placeholder="user@gmail.com" w="70%" pl={2}
                        />                        
                        <Input
                            InputLeftElement={
                                <Entypo name="key" size={20} color="black" />
                            }
                            value={password}
                            onChangeText={text => setPassword(text)}
                            variant="underlined" placeholder="********" w="70%" pl={2} type="password"
                        />
                        <Text style={{color: "red"}} >{errors.detail}</Text>
                    </VStack>
                </FormControl>
                <Button my={30} w="40%" rounded={50} onPress={() => login(email, password)}>
                        Login
                </Button>
            </Box>
        </Box>
    );
}

export default LoginScreen;