import React, { useEffect, useState } from "react";
import {
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function QuizScreen({ navigation }) {
  const [scoreTableUsers, setScoreTableUsers] = useState([
    { username: "rebellion", score: 2400 },
    { username: "ahsen", score: 2100 },
    { username: "hasan", score: 1900 },
    { username: "mithat", score: 1000 },
    { username: "hüseyin", score: 1400 },
  ]);

  const [username, setUsername] = useState("");
  const [valid, setValid] = useState(false);
  const [focus, setFocus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

   
  useEffect(() => {
    if(username.length<5){
      setValid(false)
    }else{
      setValid(true)
    }
  }, [username]);

  const handleButtonPressed = () => {
    if (valid) {
      navigation.push("Difficulty", { username: username });
      setFocus(false);
      setUsername("");
      setValid("true");
    } else {
      if(username.length<5){
        alert("Username must has at least 5 characters.");
      return
      }
      alert("Username is already taken.");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <Icon name="emoji-flags" size={70} color={"white"} />
        <Text style={styles.headerText}>Trivia Quiz</Text>
      </View>
      <View style={styles.bottomField}>
        <View style={{ height: 400, width: "100%" }}>
          <Text style={styles.scoreTableMainContainer}>SCORE TABLE</Text>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  setTimeout(() => {
                    setRefreshing(false);
                  }, 1000);
                }}
              />
            }
            style={styles.scoreTableContainer}
          >
            {scoreTableUsers.map((user) => (
              <View
                style={{
                  ...styles.scoreTableUser,
                  borderWidth: scoreTableUsers.indexOf(user) === 0 ? 2 : 0,
                  backgroundColor:
                    scoreTableUsers.indexOf(user) === 0 ? "#ffde69" : "#e6e6e6",
                }}
              >
                <Text style={{ fontSize: 24 ,
    fontFamily:"Optima"}}>
                  {scoreTableUsers.indexOf(user) + 1}
                  {"   "}
                  {user.username}
                </Text>
                <Text style={{ fontSize: 30,
    fontFamily:"Optima" }}>{user.score}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputButtonView}>
          <TextInput
            value={username}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={styles.usernameInput}
            placeholder="USERNAME"
            onChangeText={setUsername}
          ></TextInput>
          <TouchableOpacity
            onPress={handleButtonPressed}
            style={styles.goButton}
          >
            <Icon size={40} color={"white"} name="double-arrow" />
          </TouchableOpacity>
        </View>
      </View>

      {focus ? (
        <>
          <ScrollView style={styles.brightnessView}></ScrollView>
          <View style={styles.usernameView}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 30,
                backgroundColor: valid ? "#87db76" : "#ff7e75",
                paddingVertical: 2,
              }}
            >
              {username}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
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
    fontFamily:"Optima"
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
    width: "44%",
    borderWidth: 1,
    borderColor: "#3536bd",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  usernameInput: {
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 16,
    width: "44%",
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 10,
  },
  inputButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  scoreTableUser: {
    height: 70,
    width: "100%",
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
    borderColor: "#edb900",
  },
  scoreTableContainer: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    height: 200,
    padding: 10,
    borderRadius: 20,
  },
  scoreTableMainContainer: {
    fontSize: 30,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    fontFamily:"Optima"
  },
  brightnessView: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    opacity: 0.7,
  },
  usernameView: {
    backgroundColor: "#e6e6e6",
    width: "80%",
    height: 50,
    position: "absolute",
    top: "50%",
    opacity: 1,
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
});
