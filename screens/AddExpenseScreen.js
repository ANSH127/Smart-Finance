import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants/index'
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import Loading from '../components/loading'

export default function AddExpenseScreen(props) {
    const { id } = props.route.params;
    // console.log(id);

    const [title, setTitle] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const navigation = useNavigation();

    const handleAddExpense = async () => {
        if (title && amount && category) {
            // console.log(place, country)
            // navigation.goBack();
            setLoading(true);
            let doc = await addDoc(expensesRef, {
                title,
                amount,
                category,
                tripId: id,
                createdAt: new Date().toISOString()
            });
            setLoading(false);
            if (doc && doc.id) {
                navigation.goBack();
            }
        }
        else {
            Alert.alert('Please fill all the fields')

        }

    }
    return (
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-100} >
            <ScreenWrapper>
                <View className="flex justify-between h-full mx-4">
                    <ScrollView showsVerticalScrollIndicator={false} >

                        <View>
                            <View className="relative mt-5">
                                <View className="absolute top-0 left-0">
                                    <BackButton />

                                </View>

                                <Text className={`${colors.heading} text-xl font-bold text-center`} >Add Expense</Text>
                            </View>
                            <View className='flex-row justify-center my-3 mt-5 ' >

                                <Image className='h-72 w-72' source={require('../assets/images/expenseBanner.png')} />
                            </View>
                            <View className="space-y-2 mx-2" >
                                <Text className={`${colors.heading} text-lg font-bold`} >For What??</Text>
                                <TextInput value={title} className="p-3 bg-white rounded-full mb-3" onChangeText={(val) => setTitle(val)} />
                                <Text className={`${colors.heading} text-lg font-bold`} >How Much?</Text>
                                <TextInput value={amount} className="p-3 bg-white rounded-full mb-3" keyboardType='numeric' onChangeText={(val) => setAmount(val)} />
                            </View>
                            <View className="space-x-2 mx-2" >
                                <Text className={`${colors.heading} text-lg font-bold`} >Category</Text>
                                <View className="flex-row flex-wrap items-center">
                                    {
                                        categories.map(cat => {
                                            let bgColor = 'bg-white';
                                            if (cat.value === category) {
                                                bgColor = 'bg-green-200'
                                            }
                                            return (
                                                <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`} >
                                                    <Text>{cat.title}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                            </View>




                        </View>

                        <View>
                            {
                                loading ? (<Loading />) : (


                                    <TouchableOpacity style={{ backgroundColor: colors.button }} className=" my-6 rounded-full p-3 shadow-sm mx-2 " onPress={handleAddExpense} >
                                        <Text className="text-center text-white text-lg font-bold" >Add Expense</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </ScrollView>


                </View>

            </ScreenWrapper>
        </KeyboardAvoidingView>
    )
}