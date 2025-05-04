import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP1wXyHJPK5CRLWFzSVt51RFgWQB_vjVI",
    authDomain: "chargebee-ui-31984.firebaseapp.com",
    projectId: "chargebee-ui-31984",
    storageBucket: "chargebee-ui-31984.appspot.com",
    messagingSenderId: "606641947320",
    appId: "1:606641947320:web:4a4f40beaf3e6fbed62a4d",
    measurementId: "G-J6EBWH17ML",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// const user = auth.currentUser;
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};
// **Sign Out Function**
export const logout = async (router) => {
    try {
        return await signOut(auth);
        console.log("User signed out successfully.");
        // router.push(); // Redirect to login page
    } catch (error) {
        console.error("Sign Out Error:", error);
        throw error;
    }
};
export default app;
