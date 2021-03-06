import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore/lite";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID, APP_ID} from '@env'

const firebaseConfig = {
  apiKey:API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId:PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId:APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getFiveDescUser = (setScoreTableUsers, setTableLoading) => {
  const usersRef = collection(db, "usernames");
  const q = query(usersRef, orderBy("score", "desc"), limit(5));
  getDocs(q).then((res) => {
    let querySnapshot = res;
    querySnapshot.forEach((doc) => {
      // setScoreTableUsers(doc.data());
      setScoreTableUsers((prev) => [...prev, doc.data()]);
      setTableLoading(false);
    });
  });
};

export const setUser = (
  username,
  navigation,
  setFocus,
  setUsername,
  setValid,
  setLoading
) => {
  //username, navigation, setFocus, setUsername, setValid, setLoading
  const ref = doc(db, "usernames", username);
  getDoc(ref).then((res) => {
    if (res.exists()) {
      setDoc(doc(db, "usernames", username), {
        username: username,
        score: res.data().score,
      }).then(() => {
        navigation.push("Difficulty", { username: username });
        setFocus(false);
        setUsername("");
        setValid("true");
        setLoading(false);
      });
    } else {
      setDoc(doc(db, "usernames", username), {
        username: username,
        score: 0,
      }).then(() => {
        navigation.push("Difficulty", { username: username });
        setFocus(false);
        setUsername("");
        setValid("true");
        setLoading(false);
      });
    }
  });
};

export const updateScore = (username, score) => {
  getDoc(doc(db, "usernames", username)).then((res) => {
    setDoc(doc(db, "usernames", username), {
      username: username,
      score: res.data().score + score,
    });
  });
};
