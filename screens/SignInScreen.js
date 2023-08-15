import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import Loading from '../components/loading'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from '../redux/slices/user'
import { themeColors } from '../theme'

export default function SignInScreen() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { userLoading } = useSelector(state => state.user);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (email && password) {
            // console.log(email, password)
            // navigation.goBack();
            // navigation.navigate('Home');
            try {

                dispatch(setUserLoading(true));

                // await setPersistence(auth, 'SESSION');
                await signInWithEmailAndPassword(auth, email, password);



                dispatch(setUserLoading(false));

            }
            catch (e) {
                dispatch(setUserLoading(false));
                Alert.alert('Error', e.message)
            }
        }
        else {
            Alert.alert('Please fill all the fields')

        }

    }
    return (
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-100} style={{ backgroundColor: themeColors.bg }} >
            <ScreenWrapper >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View className="flex justify-between h-full mx-4" >
                        <View>
                            <View className="relative">
                                <View className="absolute top-0 left-0">
                                    <BackButton />

                                </View>

                                <Text className={`${colors.heading} text-xl font-bold text-center`} >Sign In</Text>
                            </View>
                            <View className='flex-row justify-center my-3 mt-5 ' >

                                <Image className='h-80 w-80' source={require('../assets/images/login.png')} />
                            </View>
                            <View className="space-y-2 mx-2" >
                                <Text className={`${colors.heading} text-lg font-bold`} >Email</Text>
                                <TextInput value={email} className="p-4 bg-white rounded-full mb-3" onChangeText={(val) => setEmail(val)} />
                                <Text className={`${colors.heading} text-lg font-bold`} >Password</Text>
                                <TextInput secureTextEntry value={password} className="p-4 bg-white rounded-full mb-3" onChangeText={(val) => setPassword(val)} />
                                <TouchableOpacity className="flex-row ">
                                    <Text>Forget Password?</Text>
                                </TouchableOpacity>
                            </View>




                        </View>

                        <View>
                            {
                                userLoading ? (<Loading />) : (

                                    <TouchableOpacity style={{ backgroundColor: colors.button }} className=" my-6 rounded-full p-3 shadow-sm mx-2 " onPress={handleSubmit} >
                                        <Text className="text-center text-white text-lg font-bold" >Sign In</Text>
                                    </TouchableOpacity>)
                            }
                        </View>

                    </View>
                </TouchableWithoutFeedback>

            </ScreenWrapper>
        </KeyboardAvoidingView>
    )
}