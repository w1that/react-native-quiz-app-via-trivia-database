import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function QuizScreen({navigation}) {
  const [scoreTableUsers, setScoreTableUsers] = useState([
    { username: "mithat", score: 2400 },
    { username: "talha", score: 2100 },
    { username: "taha", score: 1900 },
    { username: "güldemet", score: 1400 },
    { username: "isa", score: 1000 },
  ]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Icon name="emoji-flags" size={70} color={"white"} />
        <Text style={styles.headerText}>Enjoy Trivia Quiz</Text>
      </View>
      <View style={styles.bottomField}>
        <View style={{ height: 400, width: "100%" }}>
          <Text
            style={styles.scoreTableMainContainer}
          >
            SCORE TABLE
          </Text>
          <ScrollView
            style={styles.scoreTableContainer}
          >
            {scoreTableUsers.map((user) => (
              <View
                style={styles.scoreTableUser}
              >
                <Text style={{ fontSize: 24 }}>
                  {scoreTableUsers.indexOf(user) + 1}
                  {"   "}
                  {user.username}
                </Text>
                <Text style={{ fontSize: 30 }}>{user.score}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={styles.inputButtonView}
        >
          <TextInput
            style={styles.usernameInput}
            placeholder="USERNAME"
          ></TextInput>
          <TouchableOpacity onPress={()=>navigation.navigate('Difficulty')} style={styles.goButton}>
            <Icon size={40} color={"white"} name="double-arrow" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#8586ff",
    width: "96%",
    height: "20%",
    borderRadius: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 50,
    marginLeft: 20,
    textAlign: "center",
    color: "white",
  },
  bottomField: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    width: "95%",
    justifyContent: "space-between",
    marginTop: 50,
    alignItems: "center",
    paddingVertical: 10,
  },
  goButton: {
    backgroundColor: "#8586ff",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#3536bd",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  usernameInput:{
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  inputButtonView:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  scoreTableUser:{
    height: 70,
    backgroundColor: scoreTableUsers.indexOf(user)===0?"#ffde69":"#e6e6e6",
    width: "100%",
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
    borderWidth:scoreTableUsers.indexOf(user)===0?2:0,
    borderColor:"#edb900"
  },
  scoreTableContainer:{
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: 200,
    padding: 10,
    borderRadius: 20,
  },
  scoreTableMainContainer:{
    fontSize: 30,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  }
});
