import axios from "axios";
import "react-native-get-random-values";
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
import Question from "./Question";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function QuizScreen({ navigation, route }) {
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [loading, setLoading] = useState(true);
  const [infoShown, setInfoShown] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [markedSize, setMarkedSize] = useState(0);

  const username = route.params.username;

  useEffect(() => {
    if (markedSize === 10) {
      navigation.navigate("Result", {
        score: score,
        username: username,
      });
    }
  }, [markedSize]);

  useEffect(() => {
    setTimeout(() => {
      setInfoShown(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (questions.length === 1) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}&type=multiple`
          // "https://opentdb.com/api.php?amount=10&type=multiple"
        )
        .then((response) => {
          setQuestions(response.data.results);
          setLoading(false);
          // setLoading(true)
        });
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
        bounces
        renderItem={(question) => {
          return (
            <Question
              markedSize={markedSize}
              setMarkedSize={setMarkedSize}
              setUserAnswers={setUserAnswers}
              userAnswers={userAnswers}
              question={question}
              setScore={setScore}
            />
          );
        }}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
      <TouchableOpacity
        onLongPress={() => navigation.navigate("Home")}
        style={{ position: "absolute", top: 50, right: 20 }}
      >
        <Icon size={40} color={"red"} name="exit-to-app"></Icon>
      </TouchableOpacity>
      {infoShown && (
        <View style={{ position: "absolute", top: 70, right: 100 }}>
          <Text>Long press to quit</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
  },
  questionContainer: {
    width: Dimensions.get("window").width - 50,
    borderRadius: 10,
    padding: 10,
  },
  questionsText: { marginRight: 10, fontSize: 24 },
  answersContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  answerButton: { borderWidth: 2, borderRadius: 10 },
  answerText: { marginRight: 10, textAlign: "center", fontWeight: "bold" },
});
