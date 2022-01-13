import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Text, TouchableOpacity, View } from "react-native";
import Answer from "./Answer";
import { nanoid } from 'nanoid';

export default function Question({ question, setUserAnswers, userAnswers, setScore }) {
  const incorrectAnswers = question.item.incorrect_answers;
  // const correctAnswer = question.item.correct_answer;
  const correctAnswer ='correct one'
  const [answers, setanswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [marked, setMarked] = useState(false)

  // useEffect(() => {
    // setUserAnswers(prev=>[...prev, {id:question.index, selectedAnswer:selectedAnswer}])
  // }, [selectedAnswer])



  useEffect(() => {
    let [incorrect1, incorrect2, incorrect3] = incorrectAnswers;
    let option1 = [incorrect2,incorrect3,correctAnswer,incorrect1];
    let option2 = [incorrect1,correctAnswer,incorrect2,incorrect3];
    let option3 = [incorrect3,incorrect1,incorrect2,correctAnswer];
    let option4 = [correctAnswer,incorrect1,incorrect2,incorrect3];

    let fortuneOption = Math.floor(Math.random()*4);
    if(fortuneOption===0){
        setanswers(option1);
    }
    if(fortuneOption===1){
        setanswers(option2);
    }
    if(fortuneOption===2){
        setanswers(option3);
    }
    if(fortuneOption===3){
        setanswers(option4);
    }
  }, []);

  useEffect(() => {
    if(marked && selectedAnswer===correctAnswer){
      setScore(prev=>prev+100);
    }
  }, [marked, selectedAnswer])



  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
        marginTop: 100,
        height: 200,
        backgroundColor: "#e0e0e0",
        borderRightWidth: 1,
      }}
    >
      <Text>{question.item.question}</Text>
      {answers.map((answer) => (
          <Answer key={nanoid()} setSelectedAnswer={setSelectedAnswer} answer={answer} />
      
      ))}
      <Button disabled={marked} onPress={()=>{
        setUserAnswers(prev=>[...prev, {id:question.index, selectedAnswer:selectedAnswer}])
        setMarked(true)
      }} title='İşaretle'></Button>
    </View>
  );
}
