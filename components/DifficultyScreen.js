import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function QuizScreen({ navigation, route }) {
  const [selected, setSelected] = useState(1);
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    if (selected === 0) {
      setDifficulty("easy");
    }
    if (selected === 1) {
      setDifficulty("medium");
    }
    if (selected === 2) {
      setDifficulty("hard");
    }
  }, [selected]);

  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      marginBottom: 20,
      borderRadius: 10,
      borderWidth: 5,
      shadowColor: "black",
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 4,
      },
    },
    inputButtonView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      flex: 1,
      marginTop: 100,
      marginBottom: 20,
    },
    goButton: {
      backgroundColor: "#8586ff",
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 10,
      width: "44%",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#3536bd",
      fontWeight: "bold",
      flexDirection: "row",
      alignItems: "center",
      height: 70,
      shadowColor: "black",
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 4,
      },
    },
    backButton: {
      backgroundColor: "white",
      paddingVertical: 16,
      paddingHorizontal: 40,
      width: "44%",
      borderRadius: 10,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#3536bd",
      fontWeight: "bold",
      flexDirection: "row",
      alignItems: "center",
      height: 70,
      shadowColor: "black",
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 4,
      },
    },
  });

  return (
    <SafeAreaView
      style={{ flex: 2, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ flex: 6, justifyContent: "flex-end" }}>
        <TouchableOpacity
          onPress={() => {
            setSelected(0);
          }}
          activeOpacity={0.7}
          style={{
            ...styles.button,
            borderColor: selected === 0 ? "#40b847" : "#51e859",
            backgroundColor: "#51e859",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            EASY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(1);
          }}
          activeOpacity={0.7}
          style={{
            ...styles.button,
            backgroundColor: "#f5cb42",
            borderColor: selected === 1 ? "#c9a736" : "#f5cb42",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            MEDIUM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected(2);
          }}
          activeOpacity={0.7}
          style={{
            ...styles.button,
            backgroundColor: "#e85151",
            borderColor: selected === 2 ? "#a82c2c" : "#e85151",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            CHALLENGING
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputButtonView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ fontWeight: "bold" }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goButton}
          onPress={() =>
            navigation.navigate("Quiz", {
              username: route.params.username,
              difficulty: difficulty,
            })
          }
        >
          <Icon size={40} color={"white"} name="double-arrow" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
