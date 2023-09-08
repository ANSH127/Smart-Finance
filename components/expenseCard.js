import { View, Text } from 'react-native'
import React from 'react'
import { categoryBG, colors } from '../theme'
import { format } from 'date-fns'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ExpenseCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('ModifyExpenses',{...item})} }>
      <View style={{ backgroundColor: categoryBG[item.category] }} className={`flex-row justify-between items-center p-3 px-5 mb-3  rounded-2xl`} >
        <View>
          <Text className={`${colors.heading} font-bold `} >{item.title}</Text>
          <Text className={`${colors.heading} font-bold text-xs `}>{item.category}</Text>
        </View>
        <View>
          <Text className={`${colors.heading} font-bold text-xs `}>
            {format(new Date(item.createdAt), 'dd MMM yyyy')}

          </Text>
          <Text className={`${colors.heading} font-semibold text-xs `}>

            {format(new Date(item.createdAt), 'hh:mm a')}

          </Text>

        </View>
        <View>
          <Text>{item.amount}</Text>

        </View>
      </View>
    </TouchableOpacity>
  )
}