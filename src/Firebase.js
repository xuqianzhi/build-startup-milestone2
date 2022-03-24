import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function signIn(email, password) {
  const firebaseConfig = {
    apiKey: "AIzaSyDx0Mevlnf4oDjDYidM2EzkOiOpXHoiZBo",
    authDomain: "xqz-cs5356.firebaseapp.com",
    projectId: "xqz-cs5356",
    storageBucket: "xqz-cs5356.appspot.com",
    messagingSenderId: "748563665138",
    appId: "1:748563665138:web:0b3a9baeaff9295fb0006b",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      console.log("pde ", idToken);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export { signIn };
