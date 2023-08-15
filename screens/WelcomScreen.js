import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { useNavigation } from '@react-navigation/native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'

export default function WelcomScreen() {
    const navigation = useNavigation()
    return (
        <SafeAreaView className='flex-1' style={{ backgroundColor: themeColors.bg }}>
            <View className='flex-1 flex justify-around my-4'>
                <Text className='text-white font-bold text-4xl text-center'>Let's Get Started</Text>
            </View>
            <View className='flex-row justify-center'>
                <Image source={require('../assets/welcome.png')} style={{ width: 350, height: 350 }} />
            </View>
            <View className='space-y-4'>
                <TouchableOpacity style={{ backgroundColor: colors.button }} className='py-3  mx-7 rounded-xl' onPress={() => navigation.navigate('SignUp')}>
                    <Text className='text-center text-gray-700 font-bold text-xl'>Sign Up</Text>
                </TouchableOpacity>
                <View className='flex-row justify-center mb-10'>
                    <Text className=' text-white font-bold '>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text className='text-yellow-400 font-bold'> Sign In</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}