import React from "react";
import {
  SafeAreaView,
  Text,
  View,
} from "react-native";

export default function QuizScreen({navigation, route}) {
  

   
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
          <Text>
              WELCOME QUIZ {route.params.username}
          </Text>
      </View>
    </SafeAreaView>
  );
}
