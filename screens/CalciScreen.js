import { View, Text, Image, TextInput, KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../theme'
import BackButton from '../components/backButton'
import Loading from '../components/loading'




export default function CalciScreen() {
    const [noofperson, setNoofperson] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [loading, setLoading] = React.useState(false);

    const handleCalculate = () => {
        if (noofperson && amount) {
            let arr = amount.split(',');
            while (arr.length < noofperson) {
                arr.push('0');
            }
            let sum = 0;
            arr.forEach((item) => {
                sum += parseInt(item);
            })
            let response=''
            let perhead = sum / noofperson;
            response+=`Total amount spent is Rs. ${sum.toFixed(2)}\n`
            response+=`Average amount spent per person is Rs. ${perhead.toFixed(2)}\n`
            for (let i = 0; i < arr.length; i++) {
                if(arr[i]>perhead){
                    response+=`Person ${i+1} will take Rs. ${(arr[i]-perhead).toFixed(2)}\n`

                }
                else{
                    response+=`Person ${i+1} will give Rs. ${(perhead-arr[i]).toFixed(2)}\n`
                }

            }
            alert(response)
            setAmount('');
            setNoofperson('');

        }
        else {
            alert('Please fill all the fields')
        }
    }
    return (
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100} >
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}
            >

                <View className="px-4" >
                    <View className="relative mt-5">
                        <View className="absolute left-0">
                            <BackButton />

                        </View>
                        <View>
                            <Text className={`${colors.heading} text-xl font-bold text-center`} >Calculator</Text>
                            <Text className={`${colors.heading} text-xs  text-center`} ></Text>

                        </View>
                        <View className='flex-row justify-center my-3 mt-5 ' >

                            <Image className='h-72 w-72' source={require('../assets/images/calci.png')} />
                        </View>

                        <View className="space-y-2 mx-2" >
                            <Text className={`${colors.heading} text-lg font-bold`} >No of Person </Text>
                            <TextInput  keyboardType='number-pad' value={noofperson} className="p-4 bg-white rounded-full mb-3" onChangeText={(val) => setNoofperson(val)} />
                            <Text className={`${colors.heading} text-lg font-bold`} >Amount(in Rs.)</Text>
                            <Text className={`${colors.heading} text-xs `} > 
                            Enter the amount spent by each person with comma separated values.
                            </Text>
                            <TextInput keyboardType='numbers-and-punctuation' value={amount} className="p-4 bg-white rounded-full mb-3" onChangeText={(val) => setAmount(val)} />



                        </View>

                    </View>
                    <View>
                            {
                                loading ? (<Loading />) : (

                                    <TouchableOpacity style={{ backgroundColor: colors.button }} className=" my-6 rounded-full p-3 shadow-sm mx-2 " onPress={handleCalculate} >
                                        <Text className="text-center text-white text-lg font-bold" >
                                            Calculate
                                        </Text>
                                    </TouchableOpacity>)
                            }
                        </View>




                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}