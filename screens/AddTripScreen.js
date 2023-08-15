import { View, Text, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Keyboard } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { TouchableWithoutFeedback } from 'react-native'

export default function AddTripScreen() {
    const [place, setPlace] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { user } = useSelector(state => state.user);

    const navigation = useNavigation();

    const handleAddTrip = async () => {
        if (place && country) {
            // console.log(place, country)
            // navigation.navigate('Home')
            setLoading(true)
            let doc = await addDoc(tripsRef, {
                place,
                country,
                userId: user.uid
            });
            setLoading(false)
            if (doc && doc.id) {
                navigation.goBack();
            }
        }
        else {
            Alert.alert('Please fill all the fields')

        }

    }
    return (
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-100} >
            <ScreenWrapper>
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}
            >
                    <View className="flex justify-between h-full mx-4">
                        <View>
                            <View className="relative mt-5">
                                <View className="absolute top-0 left-0">
                                    <BackButton />

                                </View>

                                <Text className={`${colors.heading} text-xl font-bold text-center`} >Add Trip</Text>
                            </View>
                            <View className='flex-row justify-center my-3 mt-5 ' >

                                <Image className='h-72 w-72' source={require('../assets/images/4.png')} />
                            </View>
                            <View className="space-y-2 mx-2" >
                                <Text className={`${colors.heading} text-lg font-bold`} >Where on Earth?</Text>
                                <TextInput value={place} className="p-4 bg-white rounded-full mb-3" onChangeText={(val) => setPlace(val)} />
                                <Text className={`${colors.heading} text-lg font-bold`} >Which Country</Text>
                                <TextInput value={country} className="p-4 bg-white rounded-full mb-3" onChangeText={(val) => setCountry(val)} />
                            </View>




                        </View>

                        <View>
                            {
                                loading ? (<Loading />) : (

                                    <TouchableOpacity style={{ backgroundColor: colors.button }} className=" my-6 rounded-full p-3 shadow-sm mx-2 " onPress={handleAddTrip} >
                                        <Text className="text-center text-white text-lg font-bold" >Add Trip</Text>
                                    </TouchableOpacity>)
                            }
                        </View>

                    </View>

                </TouchableWithoutFeedback>
            </ScreenWrapper>
        </KeyboardAvoidingView>
    )
}