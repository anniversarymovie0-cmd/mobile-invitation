// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: 나중에 데이터베이스를 쓴다면 아래 주석 해제
// import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD...",           // 본인 키
  authDomain: "project-id...",    // 본인 키
  projectId: "project-id...",     // 본인 키
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export default app;