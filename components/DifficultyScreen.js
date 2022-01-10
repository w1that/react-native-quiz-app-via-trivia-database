import React from 'react'
import { Text, View } from 'react-native'

export default function QuizScreen({navigation, route}) {
    return (
        <View>
            <Text>{'DIFFICULTY SCREEN => '}{route.params.username}</Text>
        </View>
    )
}
