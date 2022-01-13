import { nanoid } from 'nanoid'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Answer({answer, setSelectedAnswer}) {
    return (
          <TouchableOpacity key={nanoid()} onPress={()=>setSelectedAnswer(answer)}>
          <Text>{answer}</Text>
        </TouchableOpacity>
    )
}
