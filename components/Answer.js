import { nanoid } from "nanoid";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Answer({
  answer,
  setSelectedAnswer,
  marked,
  selectedAnswer,
}) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: marked
        ? answer === selectedAnswer && "#daabff"
        : "white",
      borderWidth: answer === selectedAnswer ? 2 : 2,
      borderColor: answer === selectedAnswer ? "#ce8fff" : "#e6e6e6",
      padding: 10,
      marginVertical: 5,
      borderRadius: 10,
      width: "80%",
    },
  });

  return (
    <TouchableOpacity
      disabled={marked}
      style={styles.button}
      key={nanoid()}
      onPress={() => setSelectedAnswer(answer)}
    >
      <Text style={{ fontSize: 20 }}>{answer}</Text>
    </TouchableOpacity>
  );
}
