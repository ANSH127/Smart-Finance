import { View, Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/screenWrapper'
import BackButton from '../components/backButton';
import { colors } from '../theme';
import { TextInput, TouchableOpacity } from 'react-native';
import { categories } from '../constants/index'

import { deleteDoc,doc,updateDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';

export default function ModifyExpenseScreen(props) {
    const navigation = useNavigation();
    console.log(props.route.params);
    const [title, setTitle] = React.useState(props.route.params.title)
    const [amount, setAmount] = React.useState(props.route.params.amount)
    const [category, setCategory] = React.useState(props.route.params.category)
    const [createdAt, setCreatedAt] = React.useState((props.route.params.createdAt))


    
    
    const handleModifyExpense = async () => {
        if (title && amount && category) {
            // console.log(place, country)
            // navigation.goBack();
            // modify the doc
            await updateDoc(doc(expensesRef, props.route.params.id), {
                title,
                amount,
                category,
                createdAt: new Date(createdAt).toISOString()
            });
            navigation.goBack();

        }
        else {
            Alert.alert('Please fill all the fields')

        }

    }
    const deleteExpense = async () => {
        try {
            await deleteDoc(doc(expensesRef, props.route.params.id));
            navigation.goBack();
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <ScreenWrapper>
            <TouchableWithoutFeedback 
            
            onPress={() => { Keyboard.dismiss() }}
             >
            <View className='flex justify-between h-full mx-4'>
                <View>

                    <View className="relative ">
                        <View className="absolute top-0 left-0">
                            <BackButton />

                        </View>

                        <Text className={`${colors.heading} text-xl font-bold text-center`} >Modify Expense Record</Text>
                    </View>

                    <View className="space-y-2 mx-2 my-3" >
                        <Text className={`${colors.heading} text-lg font-bold`} >For What??</Text>
                        <TextInput value={title} className="p-3 bg-white rounded-full mb-3" onChangeText={(val) => setTitle(val)} />
                        <Text className={`${colors.heading} text-lg font-bold`} >How Much?</Text>
                        <TextInput value={amount} className="p-3 bg-white rounded-full mb-3" keyboardType='numeric' onChangeText={(val) => setAmount(val)} />

                        {/* date */}
                        <Text className={`${colors.heading} text-lg font-bold`} >Date</Text>
                        <TextInput value={createdAt} className="p-3 bg-white rounded-full mb-3"
                        onChangeText={
                            (val) => {
                                setCreatedAt(val)
                            }

                        }
                          />






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



                    <TouchableOpacity style={{ backgroundColor: colors.button }} className=" my-2 mt-6 rounded-full p-3 shadow-sm mx-2 " onPress={handleModifyExpense} >
                        <Text className="text-center text-white text-lg font-bold" >Modify</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: 'red' }} className=" my-2 rounded-full p-3 shadow-sm mx-2 " onPress={deleteExpense} >
                        <Text className="text-center text-white text-lg font-bold" >Delete </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </ScreenWrapper>
    )
}