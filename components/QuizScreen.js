import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated
} from "react-native";

export default function QuizScreen({ navigation, route }) {
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [loading, setLoading] = useState(true);

  // const difficulty = route.params.difficulty;
  const difficulty = 'hard'


  useEffect(() => {
    axios
      .get(
        // `https://opentdb.com/api.php?amount=10&difficulty=${route.params.difficulty}`
        "https://opentdb.com/api.php?amount=10&type=multiple"
      )
      .then((response) => {
        setQuestions(response.data.results);
        setLoading(false);
        // setLoading(true)
      })
      .catch((err) => console.log(err));
  }, []);

  function encrypt(text) {
    if (text.includes("&#039")) {
      return text.replace(/&#039;/g, " ");
    }
    if (text.includes("&quot;")) {
      return text.replace(/&quot;/g, " ");
    }
    if (text.includes("&rsquo;")) {
      return text.replace(/&rsquo;/g, " ");
    }
    return text;
  }

  function mixAnswers(correctAnswer, wrongAnswers) {
    let array = wrongAnswers;
    array.push(correctAnswer);
    let fortune = Math.floor(Math.random() * 2);

    if (fortune === 0) {
      return array.reverse();
    } else {
      return array;
    }
  }

  const positionAnim =  useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(positionAnim,{
      toValue:420,
      duration:1000,
      useNativeDriver:false
    }),
    ).start()
  }, [])

  if (loading) {
    return <View style={{backgroundColor:"#e6e6e6", height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
      <Animated.Text style={{color:"gray",fontSize:20,position:"absolute",left:positionAnim}}>Wait a few seconds...</Animated.Text>
    </View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white" }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {questions.map((question) => (
          
          <View
          key={questions.indexOf(question)}
            style={{
              backgroundColor: "white",
              height: "100%",
              width: 416,
              padding:20
            }}
          >
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{position:"absolute", right:20, backgroundColor:"#ff4545", width:40, height:40,borderRadius:50, flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontWeight:"bold", color:"white",fontSize:20}}>X</Text>
      </TouchableOpacity>
            <View style={{marginTop:40, padding:20, backgroundColor:(difficulty==='hard'&&"#ffdbd9")||(difficulty==='easy'&&"#a7db81")||(difficulty==='medium'&&"#dbd270"),borderRadius:20, minHeight:200, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:24}}>{encrypt(question.question)}</Text>

            </View>
            <View style={{flexDirection:"row", flexWrap:"wrap", position:"absolute",bottom:10,left:20}}>
              {mixAnswers(
                question.correct_answer,
                question.incorrect_answers
              ).map((answer) => (
                <TouchableOpacity
                activeOpacity={0.8}
                  style={{ width: "100%", height: 100, backgroundColor: "white",borderWidth:2,borderRadius:10,borderColor:(difficulty==='hard'&&"#b80a00")||(difficulty==='easy'&&"#419900")||(difficulty==='medium'&&"#998c00"), padding:10,  marginVertical:10, flexDirection:"row", justifyContent:"center", alignItems:"center" }}
                >
                  <Text style={{fontSize:30,textAlign:"left"}}>{answer}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      
    </SafeAreaView>
  );
}
