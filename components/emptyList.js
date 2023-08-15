import { View, Text,Image } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className="flex justify-center items-center my-5 space-y-3">
        <Image className="w-36 h-36 " source={require('../assets/images/empty.png')} />
      <Text className='text-gray-400 font-bold' >{message || 'data not found'}</Text>
    </View>
  )
}