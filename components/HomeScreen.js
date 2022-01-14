import "react-native-get-random-values";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
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
import { getFiveDescUser, setUser } from "../firebase";
import { nanoid } from "nanoid";

export default function HomeScreen({ navigation }) {
  const positionAnim = useRef(new Animated.Value(0)).current;
  const loadingTextAnim = useRef(new Animated.Value(0)).current;
  const [scoreTableUsers, setScoreTableUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [valid, setValid] = useState(false);
  const [focus, setFocus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: "white",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },
    header: {
      backgroundColor: "#8586ff",
      width: "86%",
      height: "20%",
      borderRadius: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      shadowColor: "black",
      elevation: 15,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      paddingHorizontal: 20,
      marginTop: 20,
    },
    headerText: {
      fontSize: 40,
      textAlign: "center",
      color: "white",
    },
    bottomField: {
      backgroundColor: "white",
      borderRadius: 20,
      flex: 1,
      width: "84%",
      justifyContent: "space-around",
      marginTop: 10,
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
      justifyContent: "center",
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
      alignItems: "center",
      width: "100%",
    },
    scoreTableUser: {
      height: 64,
      width: "90%",
      marginBottom: 10,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 30,
      alignItems: "center",
      borderColor: "#edb900",
      shadowColor: "black",
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 4,
      },
      alignSelf: "center",
    },
    scoreTableContainer: {
      backgroundColor: "#f2f2f2",
      width: "100%",
      height: 200,
      padding: 10,
      borderRadius: 20,
      shadowColor: "black",
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 4,
      },
    },
    scoreTableMainContainer: {
      fontSize: 30,
      textAlign: "center",
      padding: 10,
      fontWeight: "bold",
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
      top: "60%",
      left: 40,
      right: 0,
      margin: "auto",
      opacity: 1,
      zIndex: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 1,
      shadowColor: "white",
      elevation: 3,
      shadowOffset: {
        width: 2,
        height: 4,
      },
    },
    loadingScreenContainer: {
      width: "100%",
      zIndex: 10,
      position: "absolute",
      height: "100%",
      alignItems: "center",
    },
    usernameCheckField: {
      color: "black",
      fontWeight: "bold",
      fontSize: 30,
      backgroundColor: valid ? "#87db76" : "#ff7e75",
      paddingVertical: 2,
    },
    mainToDifficultyLoading: {
      backgroundColor: "black",
      position: "absolute",
      top: 0,
      textAlign: "center",
      width: "90%",
      padding: 10,
      color: "white",
      fontSize: 20,
      borderRadius: 20,
    },
    scoreTableLoading: {
      textAlign: "center",
      position: "absolute",
      top: 400,
      fontWeight: "bold",
      fontSize: 20,
    },
  });

  // const [scoreTableUsers, setScoreTableUsers] = useState([         //fake data
  //   { username: "rebellion", score: 2400 },
  //   { username: "ahsen", score: 2100 },
  //   { username: "hasan", score: 1900 },
  //   { username: "mithat", score: 1000 },
  //   { username: "hüseyin", score: 1400 },
  // ]);

  useEffect(() => {
    setTableLoading(true); //show text while table content is loading.
    getFiveDescUser(setScoreTableUsers, setTableLoading); //take first 5 users from firestore.
  }, []);

  const topToCenter = () => {
    //animation between the main screen and the difficulty screen.
    Animated.timing(positionAnim, {
      toValue: 400,
      useNativeDriver: false,
    }).start();
  };

  const loadingTextBottom = () => {
    //animation between the difficulty screen and the quiz screen.
    Animated.loop(
      Animated.timing(loadingTextAnim, {
        toValue: 400,
        duration: 1000,
        useNativeDriver: false,
      })
    ).start();
  };

  useEffect(() => {
    //check if the content is loading, then control animations.
    if (loading === true) {
      topToCenter();
    }
    if (tableLoading === true) {
      loadingTextBottom();
    }
  }, [loading, loadingTextAnim]);

  useEffect(() => {
    //each time username changes, see if username is valid.
    if (username.length < 5) {
      setValid(false);
    } else {
      setValid(true);
    }
    for (let i = 0; i < [...username].length; i++) {
      if ([...username][i] === " ") {
        setValid(false);
        alert("Username can't have a space character.");
        break;
      }
    }
  }, [username]);

  useEffect(() => {
    //check if the player scrolled the score table to refresh.
    console.log("refreshing");
    if (refreshing) {
      setTableLoading(true);
      setScoreTableUsers([]);
      getFiveDescUser(setScoreTableUsers, setTableLoading);
    }
    setRefreshing(false);
  }, [refreshing]);

  const handleButtonPressed = () => {
    //when username entered and pressed button to go, see if username valid, then set the username to firebase.
    setLoading(true);
    if (valid) {
      setUser(
        username,
        navigation,
        setFocus,
        setUsername,
        setValid,
        setLoading
      );
    } else {
      if (username.length < 5) {
        alert("Username must has at least 5 characters.");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <Icon name="emoji-flags" size={70} color={"white"} />
          <Text style={styles.headerText}>Trivia Quiz</Text>
        </View>
        <View style={styles.bottomField}>
          <View style={{ height: 340, width: "100%" }}>
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
              {tableLoading ? (
                <View style={{ height: 400, alignItems: "center" }}>
                  <Animated.Text
                    // style={styles.tableLoadingAnimation}
                    style={styles.scoreTableLoading}
                  >
                    Loading
                  </Animated.Text>
                </View>
              ) : (
                scoreTableUsers.map((user) => (
                  <View
                    key={nanoid()}
                    style={{
                      ...styles.scoreTableUser,
                      borderWidth: scoreTableUsers.indexOf(user) === 0 ? 2 : 0,
                      backgroundColor:
                        scoreTableUsers.indexOf(user) === 0
                          ? "#ffde69"
                          : "#e6e6e6",
                    }}
                  >
                    <Text style={{ fontSize: 20 }}>
                      {scoreTableUsers.indexOf(user) + 1}
                      {"   "}
                      {user.username}
                    </Text>
                    <Text style={{ fontSize: 20 }}>{user.score}</Text>
                  </View>
                ))
              )}
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
              <Icon size={30} color={"white"} name="double-arrow" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {loading && (
        <>
          <ScrollView style={styles.brightnessView}></ScrollView>
          <View style={styles.loadingScreenContainer}>
            <Animated.Text style={styles.mainToDifficultyLoading}>
              Wait a few seconds...
            </Animated.Text>
          </View>
        </>
      )}
      {focus ? (
        <>
          <ScrollView style={styles.brightnessView}></ScrollView>
          <View style={styles.usernameView}>
            <Text style={styles.usernameCheckField}>{username}</Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
