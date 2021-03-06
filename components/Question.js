import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Answer from "./Answer";
import { nanoid } from "nanoid";
import Icon from "react-native-vector-icons/AntDesign";

export default function Question({
  question,
  setUserAnswers,
  setScore,
  markedSize,
  setMarkedSize,
}) {
  const incorrectAnswers = question.item.incorrect_answers;
  const correctAnswer = question.item.correct_answer;
  // const correctAnswer = "correct one";    //fake correctAnswer
  const [answers, setanswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    //mix the correct one with other incorrects.
    let [incorrect1, incorrect2, incorrect3] = incorrectAnswers;
    let option1 = [incorrect2, incorrect3, correctAnswer, incorrect1];
    let option2 = [incorrect1, correctAnswer, incorrect2, incorrect3];
    let option3 = [incorrect3, incorrect1, incorrect2, correctAnswer];
    let option4 = [correctAnswer, incorrect1, incorrect2, incorrect3];

    let fortuneOption = Math.floor(Math.random() * 4);
    if (fortuneOption === 0) {
      setanswers(option1);
    }
    if (fortuneOption === 1) {
      setanswers(option2);
    }
    if (fortuneOption === 2) {
      setanswers(option3);
    }
    if (fortuneOption === 3) {
      setanswers(option4);
    }
  }, []);

  useEffect(() => {
    //check if the mark button pressed and if selected is correct one, calculate score.
    if (marked && selectedAnswer === correctAnswer) {
      setScore((prev) => prev + 100);
    }
  }, [marked, selectedAnswer]);

  const styles = StyleSheet.create({
    mainContainer: {
      width: Dimensions.get("screen").width,
      marginTop: 100,
      marginBottom: 50,
      paddingHorizontal: 20,
      backgroundColor: "white",
      alignItems: "center",
    },
    answersContainer: {
      position: "absolute",
      bottom: 70,
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    selectButton: {
      borderColor: marked ? "#c9c9c9" : "#29d935",
      borderWidth: 2,
      padding: 10,
      marginTop: 5,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: 10,
      position: "absolute",
      bottom: 0,
      width: "80%",
    },
    completeButton: {
      borderColor: "#29d935",
      borderWidth: 2,
      padding: 10,
      marginTop: 5,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      borderRadius: 10,
      position: "absolute",
      bottom: 0,
      width: "80%",
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={{ width: "80%" }}>
        <Text style={{ fontSize: 24, paddingBottom: 30 }}>
          {question.item.question}
        </Text>
      </View>
      <View style={styles.answersContainer}>
        {answers.map((answer) => (
          <Answer
            key={nanoid()}
            setSelectedAnswer={setSelectedAnswer}
            answer={answer}
            marked={marked}
            selectedAnswer={selectedAnswer}
          />
        ))}
      </View>
      {markedSize < 9 && (
        <TouchableOpacity
          style={styles.selectButton}
          disabled={marked}
          onPress={() => {
            if (selectedAnswer.length > 0) {
              setUserAnswers((prev) => [
                ...prev,
                { id: question.index, selectedAnswer: selectedAnswer },
              ]);
              setMarked(true);
              setMarkedSize((prev) => prev + 1);
            }
          }}
        >
          <Icon
            color={marked ? "#e6e6e6" : "#18b522"}
            size={30}
            name="check"
          ></Icon>
          <Text
            style={{
              fontSize: 20,
              color: marked ? "#e6e6e6" : "#18b522",
              paddingLeft: 10,
            }}
          >
            Select
          </Text>
        </TouchableOpacity>
      )}

      {markedSize === 9 && (
        <TouchableOpacity
          style={styles.completeButton}
          disabled={marked}
          onPress={() => {
            setMarked(true);
            setMarkedSize((prev) => prev + 1);
            setUserAnswers((prev) => [
              ...prev,
              { id: question.index, selectedAnswer: selectedAnswer },
            ]);
          }}
        >
          <Icon color={"#18b522"} size={30} name="check"></Icon>
          <Text style={{ fontSize: 20, color: "#18b522", paddingLeft: 10 }}>
            Complete
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
