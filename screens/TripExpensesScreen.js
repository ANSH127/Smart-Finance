import { View, Text, TouchableOpacity, Image, FlatList, Platform } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import ExpenseCard from '../components/expenseCard'
import { getDocs, or, query, where,orderBy } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'


const items = [
    {
        id: 1,
        title: 'ate sandwich',
        amount: 4,
        category: 'food'
    },
    {
        id: 2,
        title: 'bought a jacket',
        amount: 50,
        category: 'shopping'
    },
    {
        id: 3,
        title: 'watched a movie',
        amount: 100,
        category: 'entertainment'
    },

]

export default function TripExpensesScreen(props) {
    const { id, place, country } = props.route.params;
    const navigation = useNavigation();
    const [expenses, setExpenses] = React.useState([]);
    const [amount, setAmount] = React.useState(0);
    const [lastsevendaysamount, setLastsevendaysamount] = React.useState(0);
    const [lastthirtydaysamount, setLastthirtydaysamount] = React.useState(0);
    const isFocused = useIsFocused();


    const fetchExpenses = async () => {
        const q = query(expensesRef, where("tripId", "==", id));
        const querySnapshot = await getDocs(q);
        let data = []
        let amt = 0;
        querySnapshot.forEach(doc => {

            data.push({ ...doc.data(), id: doc.id })
            amt += parseInt((doc.data().amount));

        });
        // console.log(data);

        data = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


        let lastsevendays = data.filter(item => new Date(item.createdAt).getTime() >= Date.now() - 604800000);
        let lastthirtydays = data.filter(item => new Date(item.createdAt).getTime() >= Date.now() - 2592000000);
        // console.log(lastsevendays,lastthirtydays);
        const lastservendaysamount = lastsevendays.reduce((a, b) => a + parseInt(b.amount), 0);
        const lastthirtydaysamount = lastthirtydays.reduce((a, b) => a + parseInt(b.amount), 0);

        setExpenses(data);
        setAmount(amt);
        setLastsevendaysamount((lastservendaysamount / lastsevendays.length).toFixed(2));
        setLastthirtydaysamount((lastthirtydaysamount / lastthirtydays.length).toFixed(2));



    }
    useEffect(() => {
        if (isFocused) {

            fetchExpenses();
        }

    }, [isFocused])
    return (
        <ScreenWrapper className='flex-1'>
            <View className="px-4" >
                <View className="relative mt-5">
                    <View className="absolute top-2 left-0">
                        <BackButton />

                    </View>
                    <View>
                        <Text className={`${colors.heading} text-xl font-bold text-center`} >{place}</Text>
                        <Text className={`${colors.heading} text-xs  text-center`} >{country}</Text>

                    </View>
                </View>

                {/* <View className='flex-row justify-center items-center  rounded-xl  mb-4 ' >
                    <Image source={require('../assets/images/7.png')} className="w-80 h-80" />
                </View> */}
                <View className=' space-y-4'>
                    <View className="flex-row justify-between items-center">
                        <Text className={`${colors.heading} font-bold text-xl`} >Expenses</Text>
                        <TouchableOpacity className='p-2 px-3 bg-white border border-gray-200 rounded-full' onPress={() => navigation.navigate('AddTripExpenses', { id, place, country })} >
                            <Text className={colors.heading} >Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View className='flex-row justify-center items-center gap-x-2' >
                        <Text className={`p-2 px-3 bg-white border border-gray-200 font-bold rounded-full ${colors.heading}`} >Total: {amount}</Text>
                        <Text className={`p-2 px-3 bg-white border border-gray-200 font-bold rounded-full ${colors.heading}`} >7 days:  {lastsevendaysamount}</Text>
                        <Text className={`p-2 px-3 bg-white border border-gray-200 font-bold rounded-full ${colors.heading}`} >30 days:  {lastthirtydaysamount}</Text>


                    </View> */}
                    <View >
                        <FlatList
                            data={[
                                { title: 'Total', amount: amount },
                                { title: '7 days', amount: lastsevendaysamount },
                                { title: '30 days', amount: lastthirtydaysamount },
                            ]}
                            keyExtractor={item => item.title}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"} />}
                            renderItem={({ item }) => {
                                return (
                                    <View className='flex-row justify-between items-center' >
                                        <Text className={`${colors.heading} font-bold text-xl`} >{item.title}</Text>
                                        <Text className={`${colors.heading} font-bold text-xl`} >{item.amount}</Text>
                                    </View>
                                )

                            }}

                        />





                    </View>

                    <View style={{ height: 600}}  >
                        <FlatList
                            data={expenses}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={<EmptyList message={"You haven't recorded any expenses yet"} />}

                            renderItem={({ item }) => {
                                return (
                                    <ExpenseCard item={item} />
                                )

                            }}




                        />
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}