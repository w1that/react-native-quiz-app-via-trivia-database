import axios from "axios";
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  StyleSheet,
} from "react-native";
import Question from './Question'
import { nanoid } from "nanoid";

export default function QuizScreen({ navigation, route }) {
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [loading, setLoading] = useState(true);

  const [userAnswers, setUserAnswers] = useState([])

  console.log(userAnswers)


 
  useEffect(() => {
    if(questions.length===1){
      axios
      .get(
        // `https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}`
        "https://opentdb.com/api.php?amount=10&type=multiple"
      )
      .then((response) => {
        setQuestions(response.data.results);
        setLoading(false);
        // setLoading(true)
      })
      .catch((err) => console.log(err));
    }
  }, []);

  

 

  const positionAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(positionAnim, {
        toValue: 420,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "#e6e6e6",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Text
          style={{
            color: "gray",
            fontSize: 20,
            position: "absolute",
            left: positionAnim,
          }}
        >
          Wait a few seconds...
        </Animated.Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      
      <FlatList
        horizontal
        data={questions}
        showsHorizontalScrollIndicator={false}
        renderItem={(question) => {
          return (
            <Question  setUserAnswers={setUserAnswers} question={question}/>
          );
        }}
        pagingEnabled
      ></FlatList>
    </SafeAreaView>
  );

}


const styles = StyleSheet.create({
  container:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
  },
  questionContainer:{
    
    width: Dimensions.get("window").width-50,
    borderRadius:10,
    padding: 10,
  },
  questionsText:{ marginRight: 10, fontSize: 24 },
  answersContainer:{ display: "flex", flexDirection: "column", alignItems:"center",justifyContent:"center",width:"100%" },
  answerButton:{ borderWidth: 2,
    borderRadius: 10,
    },
  answerText:{ marginRight: 10, textAlign:"center",fontWeight:"bold" }
})