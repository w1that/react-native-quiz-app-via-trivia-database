import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "../firebase";

export default function ResultScreen({ navigation, route }) {
  const [counter, setCounter] = useState(5000);
  const [docSnap, setDocSnap] = useState({});

  useEffect(() => {
    setTimeout(() => {
      navigation.push("Home");
    }, counter);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setCounter((prev) => prev - 1000);
    }, 1000);
  }, []);

  useEffect(() => {
    getDoc(doc(db, "usernames", route.params.username)).then((res) => {
      // if(res.data().score<route.params.score){
      //     setDoc(doc(db, "usernames", route.params.username), {
      //     username: route.params.username,
      //     score: res.data().score+route.params.score,
      //   }).then(res=>console.log(res))
      // }else{
      //     console.log("aynı ya da daha büyük")
      // }
      setDoc(doc(db, "usernames", route.params.username), {
        username: route.params.username,
        score: res.data().score + route.params.score,
      });
    });
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: "#ffe940",
          width: "90%",
          padding: 0,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#857500",
        }}
      >
        <Text
          style={{
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
          }}
        >
          🎉 Congratulations! 🎉
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20, paddingBottom: 20 }}>
          Your Score: {route.params.score}
        </Text>
      </View>

      <View>
        <View
          style={{
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
          }}
        >
          <Text style={{ fontSize: 20 }}>{counter / 1000}</Text>
        </View>
      </View>
    </View>
  );
}
