// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCvzQMl9GLa2GhbqBkdmsX_4xDCPWqeVZs",
	authDomain: "cda-fund-org.firebaseapp.com",
	projectId: "cda-fund-org",
	storageBucket: "cda-fund-org.appspot.com",
	messagingSenderId: "890013803871",
	appId: "1:890013803871:web:fc119f31afccf1b1bc82ea",
	measurementId: "G-20YV54J68X",
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
