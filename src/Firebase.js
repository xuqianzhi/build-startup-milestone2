import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx0Mevlnf4oDjDYidM2EzkOiOpXHoiZBo",
  authDomain: "xqz-cs5356.firebaseapp.com",
  projectId: "xqz-cs5356",
  storageBucket: "xqz-cs5356.appspot.com",
  messagingSenderId: "748563665138",
  appId: "1:748563665138:web:0b3a9baeaff9295fb0006b",
};
<<<<<<< HEAD

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function signIn(email, password) {
=======

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
>>>>>>> 98d35620ea51e13908e87a55581950e36b599403

function signIn(email, password) {
  console.log(auth.createSessionCookie);
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log("successfully logged in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error logging in: ", errorCode, errorMessage);
    });
}

function signUp(email, password, passwordConfirm, type) {
  console.log(email, password, passwordConfirm, type);
}

export { signIn, signUp };
