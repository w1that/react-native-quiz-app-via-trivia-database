import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {updateScore } from "../firebase";

export default function ResultScreen({ navigation, route }) {
  const [counter, setCounter] = useState(5000);

  useEffect(() => {
    //after 5 seconds, navigate to main screen.
    setTimeout(() => {
      navigation.push("Home");
    }, counter);
  }, []);

  useEffect(() => {
    //timer starts immediately.
    setInterval(() => {
      setCounter((prev) => prev - 1000);
    }, 1000);
  }, []);

  useEffect(() => {
    updateScore(route.params.username, route.params.score);
  }, []);

  const styles = StyleSheet.create({
    mainContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      height: "100%",
    },
    innerContainer: {
      backgroundColor: "#ffe940",
      width: "90%",
      padding: 0,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#857500",
    },
    congratsText: {
      backgroundColor: "#ffe414",
      textAlign: "center",
      fontSize: 30,
      padding: 20,
      marginBottom: 20,
      borderRadius: 10,
      shadowColor: "black",
      elevation: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    scoreContainer: {
      width: 50,
      height: 50,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
      borderRadius: 50,
      borderColor: "#b5b5b5",
      borderWidth: 1,
      shadowColor: "black",
      elevation: 4,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
        <Text style={{ textAlign: "center", fontSize: 20, paddingBottom: 20 }}>
          Your Score: {route.params.score}
        </Text>
      </View>

      <View>
        <View style={styles.scoreContainer}>
          <Text style={{ fontSize: 20 }}>{counter / 1000}</Text>
        </View>
      </View>
    </View>
  );
}
