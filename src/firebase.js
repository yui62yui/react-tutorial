// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbEw369bp-xdfrVNZKjAl4Mnx3Tmu474U",
  authDomain: "fir-test-11f58.firebaseapp.com",
  projectId: "fir-test-11f58",
  storageBucket: "fir-test-11f58.appspot.com",
  messagingSenderId: "112394950630",
  appId: "1:112394950630:web:5cde2ab8c9b43b042f2827",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// React에서 정상적으로 동작하는 지 확인하기 위해서 임시로 export 시켜줍니다. app이 정상적으로 출력되는 것을 확인하고 나면, 지워줍니다.
export const auth = getAuth(app);
